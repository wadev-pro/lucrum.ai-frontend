import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import * as _ from 'underscore';
import {
  DateTimeService,
  IDateRange,
  IDateRangeSelection,
} from '../../shared/services/date-time.service';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as campaignModels from 'app/shared/models/campaign.model';
import { TablePagination } from 'app/shared/models/common.model';
import { AppState } from 'app/store/';
import * as CampaignActions from 'app/store/campaign/campaign.actions';
import { initialState } from 'app/store/campaign/campaign.states';

import {
  dataSelector,
  didFetchSelector,
  fetchingSelector,
  filterSelector,
  metaSelector,
  statisticsDidFetchSelector,
  statisticsFetchingSecltor,
} from 'app/store/campaign/campaign.selectors';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.style.scss'],
  animations: egretAnimations,
})
export class CampaignsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();
  public filter$: Observable<any>;
  public fetching$: Observable<any>;
  public statisticsFetching$: Observable<any>;
  public didFetch$: Observable<any>;
  public statisticsDidFetch$: Observable<any>;
  public meta$: Observable<any>;
  public campaigns$: Observable<any>;

  public filter: campaignModels.CampaignFilter;
  public meta: campaignModels.CampaignMeta;
  public daterrange: IDateRange;
  public search = '';
  public campaigns: Array<campaignModels.Campaign> = [];

  public pagination: TablePagination = {
    length: initialState.meta.total,
    pageIndex: initialState.filter.page,
    pageSize: initialState.filter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private dateTimeService: DateTimeService
  ) {
    this.daterrange = this.dateTimeService.getDefaultDateRange();
    this.filter$ = this.store$.select(filterSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
    this.statisticsFetching$ = this.store$.select(statisticsFetchingSecltor);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.statisticsDidFetch$ = this.store$.select(statisticsDidFetchSelector);
    this.meta$ = this.store$.select(metaSelector);
    this.campaigns$ = this.store$.select(dataSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
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
        this.onFilterChange(
          this.dateTimeService.getFormattedDateRangeSelection(this.daterrange)
        );
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

    this.campaigns$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaigns => {
          if (!deepEqual(this.campaigns, campaigns)) {
            this.campaigns = campaigns;
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

    combineLatest(this.didFetch$, this.statisticsDidFetch$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([didFetch, statisticDidFetch]) => {
        if (didFetch && !statisticDidFetch) {
          this.loadStatistics();
        }
      });
  }

  loadData() {
    this.store$.dispatch(new CampaignActions.GetList(this.filter));
  }

  loadStatistics() {
    const data = {
      campaign_ids: _.map(
        this.campaigns,
        (item: campaignModels.Campaign) => item.campaign_id
      ),
    };
    // this.store$.dispatch(new CampaignActions.GetStatistics(data));
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
  }

  initFilter() {
    this.daterrange = {
      begin: new Date(this.filter.start_date),
      end: new Date(this.filter.end_date),
    };
    this.search = this.filter.search;
  }

  onFilterChange(selectedDateRange: IDateRangeSelection) {
    const { start_date, end_date } = selectedDateRange;

    this.daterrange = DateTimeService.getDateRangeFromSelection(
      selectedDateRange
    );

    let data = {
      start_date,
      end_date,
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
    this.store$.dispatch(new CampaignActions.UpdateFilter(updated_filter));
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  refreshTable() {
    this.loadData();
  }
}
