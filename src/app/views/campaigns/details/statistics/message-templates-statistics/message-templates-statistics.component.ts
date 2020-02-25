import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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

import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as commonModels from 'app/shared/models/common.model';
import { TablePagination } from 'app/shared/models/common.model';
import { AppState } from 'app/store/';
import * as CampaignStatisticsActions from 'app/store/campaign-statistics/campaign-statistics.actions';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';

import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';
import {
  messageTemplateDidFetchSelector,
  messageTemplateFilterSelector,
  messageTemplateMetaSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';

@Component({
  selector: 'app-campaign-details-statistics-message-templates-statistics',
  templateUrl: './message-templates-statistics.component.html',
  styleUrls: ['./message-templates-statistics.style.css'],
  animations: egretAnimations,
})
export class MessageTemplatesStatisticsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public campaignId$: Observable<any>;
  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;

  public campaign_id: string;
  public filter: commonModels.Filter;
  public meta: commonModels.Meta;
  public search = '';

  public pagination: TablePagination = {
    length: initialState.messageTemplateMeta.total,
    pageIndex: initialState.messageTemplateFilter.page,
    pageSize: initialState.messageTemplateFilter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef
  ) {
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.filter$ = this.store$.select(messageTemplateFilterSelector);
    this.meta$ = this.store$.select(messageTemplateMetaSelector);
    this.didFetch$ = this.store$.select(messageTemplateDidFetchSelector);
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
        debounceTime(1000),
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
  }

  loadData() {
    const payload = {
      campaign_id: this.campaign_id,
      filter: this.filter,
    };
    this.store$.dispatch(
      new CampaignStatisticsActions.GetMessageTemplate(payload)
    );
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
    this.store$.dispatch(
      new CampaignStatisticsActions.UpdateMessageTemplateFilter(updated_filter)
    );
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }
}
