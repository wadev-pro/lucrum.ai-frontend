import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, fromEvent, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { filterBySearch, sortByFilter } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { TablePagination } from 'app/shared/models/common.model';
import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import { MessageTemplate } from 'app/shared/models/message-template.model';
import { MessageTemplatePreview } from 'app/shared/models/message-template.model';
import { MessageTemplateGroupService } from 'app/shared/services/apis/message-template-group.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store';
import { GetList as templateGetList } from 'app/store/message-template/message-template.actions';

@Component({
  selector: 'app-message-template-group-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.style.scss'],
  animations: egretAnimations,
})
export class MessageTemplateGroupDetailComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();
  filterableFields: string[] = ['messageTemplateName', 'preview'];

  columnHeaders: string[] = [
    'srNo',
    'messageTemplateName',
    'preview',
    'actions',
  ];

  public messageTemplates$: Observable<any>;

  public isReady: boolean;
  public group_id: string = null;
  public messageTemplateGroup: MessageTemplateGroup;
  public messageTemplatePreviewsList: Array<MessageTemplatePreview>;
  public messageTemplatePreviews: Array<MessageTemplatePreview>;
  public offset: number;
  public filter: commonModels.Filter = {
    search: '',
    order_by: 'name',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  };
  public meta: commonModels.Meta = {
    current_page: this.filter.page - 1,
    from: 0,
    last_page: 0,
    path: '',
    per_page: this.filter.per_page,
    to: 0,
    total: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private service$: MessageTemplateGroupService,
    private route$: ActivatedRoute,
    private loader$: AppLoaderService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.messageTemplates$ = this.store$.select(
      state => state.messageTemplate.data
    );
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.isReady = false;
    this.route$.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.group_id = params.get('id');
      this.initData();
    });

    this.store$
      .select(state => state.messageTemplate.didFetch)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(
          didFetch => !didFetch && this.store$.dispatch(new templateGetList())
        )
      )
      .subscribe();

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 2 || !res.length),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((search: string) => {
        this.updateFilter({
          search: search,
        });
      });
  }

  initData() {
    setTimeout(() => {
      this.loader$.open();
    }, 10);
    combineLatest(
      this.service$.getById(this.group_id),
      this.service$.getAllTemplatePreviewsById(this.group_id),
      this.messageTemplates$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([res1, res2, res3]) => {
        const messageTemplatePreviews: Array<MessageTemplatePreview> = res2;
        const messageTemplateList: Array<MessageTemplate> = res3;
        this.messageTemplateGroup = res1;

        this.messageTemplatePreviewsList = messageTemplatePreviews.map(item => {
          const template: MessageTemplate = messageTemplateList.find(
            g_item => g_item.templateId === item.messageTemplateId
          );
          return {
            ...item,
            messageTemplateName: (template && template.name) || '',
          };
        });
        this.applyFilter();
        this.isReady = true;
        this.changeDetectorRefs.detectChanges();
        this.loader$.close();
      });
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  updateFilter(data) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.filter = {
      ...this.filter,
      ...updated_filter,
    };
    this.applyFilter();
  }

  applyFilter() {
    this.offset = (this.filter.page - 1) * this.filter.per_page;
    const searchKey = this.filter.search.trim(),
      from = (this.filter.page - 1) * this.filter.per_page,
      to = this.filter.page * this.filter.per_page,
      last_page = Math.ceil(
        this.messageTemplatePreviewsList.length / this.filter.per_page
      );
    let tmpMessageTemplatePreviews: Array<
      MessageTemplatePreview
    > = sortByFilter(this.filter, this.messageTemplatePreviewsList);
    if (searchKey) {
      tmpMessageTemplatePreviews = filterBySearch(
        searchKey,
        this.filterableFields,
        tmpMessageTemplatePreviews
      );
    }

    this.meta = {
      current_page: this.filter.page - 1,
      from,
      last_page,
      path: '',
      per_page: this.filter.per_page,
      to,
      total: tmpMessageTemplatePreviews.length,
    };

    this.messageTemplatePreviews = tmpMessageTemplatePreviews.slice(from, to);
    this.changeDetectorRefs.detectChanges();
  }

  sortData(event) {
    const updated_filter = {
      order_by: event.active ? event.active : this.filter.order_by,
      order_dir: event.direction ? event.direction : this.filter.order_dir,
    };
    this.updateFilter(updated_filter);
  }
}
