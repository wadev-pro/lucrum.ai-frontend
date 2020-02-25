import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { fromEvent, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import * as _ from 'underscore';
import { v4 as uuid } from 'uuid';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as commonModels from 'app/shared/models/common.model';
import { TablePagination } from 'app/shared/models/common.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppState } from 'app/store/';
import { GetList as getTemplateGroupList } from 'app/store/message-template-group/message-template-group.actions';
import * as actions from 'app/store/message-template/message-template.actions';
import { initialState } from 'app/store/message-template/message-template.states';

import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';
import {
  didFetchSelector,
  fetchingSelector,
  filterSelector,
  metaSelector,
} from 'app/store/message-template/message-template.selectors';

import { getCurrentUTCTime } from 'app/shared/helpers/utils';
import { MessageTemplate } from 'app/shared/models/message-template.model';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { didFetchSelector as didTemplateGroupFetch } from 'app/store/message-template-group/message-template-group.selectors';
import { MessageTemplateEditModalComponent } from './table/edit-modal/edit-modal.component';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss'],
  animations: egretAnimations,
})
export class MessageTemplateComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public campaignId$: Observable<any>;
  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public didTemplateGroupFetch$: Observable<any>;
  public fetching$: Observable<any>;

  public campaign_id: string;
  public filter: commonModels.Filter = initialState.filter;
  public meta: commonModels.Meta = initialState.meta;
  public search = '';

  public pagination: TablePagination = {
    length: initialState.meta.total,
    pageIndex: initialState.filter.page,
    pageSize: initialState.filter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmService$: AppConfirmService,
    private authenticationService$: AuthService
  ) {
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.meta$ = this.store$.select(metaSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.didTemplateGroupFetch$ = this.store$.select(didTemplateGroupFetch);
    this.fetching$ = this.store$.select(fetchingSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.campaignId$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaign_id => {
          this.campaign_id = campaign_id;
          this.initData();
        })
      )
      .subscribe();
  }
  initData() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 2 || !res.length),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.onFilterChange();
      });
    this.filter$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(data => {
          if (!deepEqual(this.filter, data)) {
            this.filter = data;
            this.initFilter();
          }
        })
      )
      .subscribe();

    this.meta$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(meta => {
          if (!deepEqual(this.meta, meta)) {
            this.meta = meta;
            this.initMeta();
          }
        })
      )
      .subscribe();

    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();

    this.didTemplateGroupFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadTemplateGroupData())
      )
      .subscribe();
  }

  loadData() {
    this.store$.dispatch(new actions.GetList());
  }

  loadTemplateGroupData() {
    this.store$.dispatch(new getTemplateGroupList());
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
    this.changeDetectorRefs$.detectChanges();
  }

  initFilter() {
    this.search = this.filter.search;
  }

  onFilterChange() {
    let data = {
      search: this.search,
    };
    if (this.search) {
      data = _.extend(data, {
        page: 1,
      });
    }
    this.updateFilter(data);
  }

  updateFilter(data) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.store$.dispatch(new actions.UpdateFilter(updated_filter));
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  onAddItem() {
    const title = 'Add Message Template';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      MessageTemplateEditModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: {}, type: 'add' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const payload: MessageTemplate = {
        ...res,
        templateId: uuid(),
        isRemoved: false,
        createdBy: this.authenticationService$.getApiIdentification(),
        createdAt: getCurrentUTCTime(),
      };
      this.store$.dispatch(new actions.Create(payload));
    });
  }
}
