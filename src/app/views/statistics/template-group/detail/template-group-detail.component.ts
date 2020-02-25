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
import * as moment from 'moment-timezone';
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
import { Meta, TablePagination } from 'app/shared/models/common.model';
import * as statisticsModel from 'app/shared/models/statistics.model';
import { AppState } from 'app/store/';
import * as StatisticsActions from 'app/store/statistics/statistics.actions';
import { initialState } from 'app/store/statistics/statistics.states';

import {
  templateGroupDataSelector,
  templateGroupDidFetchSelector,
  templateGroupFetchingSelector,
  templateGroupFilterSelector,
  templateGroupMetaSelector,
} from 'app/store/statistics/statistics.selectors';

@Component({
  selector: 'app-statistics-template-group-detail',
  templateUrl: './template-group-detail.component.html',
  styleUrls: ['./template-group-detail.style.css'],
  animations: egretAnimations,
})
export class TemplateGroupDetailComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  public columnHeaders: string[] = [
    'srNo',
    'name',
    'messagesSent',
    'mobileClicks',
    'otherClicks',
    'conversionCount',
    'cost',
    'revenue',
    'profit',
    'roi',
    'ctr',
    'optRate',
    'complainerRate',
    'replyRate',
    'actions',
  ];

  sortableFields: object = {
    tld: 'name',
    messagesSent: 'sentcount',
    mobileClicks: 'mobileclick',
    otherClicks: 'otherclick',
    conversionCount: 'conversioncount',
    cost: 'cost',
    revenue: 'revenue',
    optRate: 'opt_rate',
    complainerRate: 'complainer_rate',
    replyRate: 'reply_rate',
    profit: 'profit',
    roi: 'roi',
    ctr: 'ctr'
  };

  private onDestroy$ = new Subject<void>();

  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public templateGroup$: Observable<any>;

  public filter: statisticsModel.TemplateGrouplStatisticsFilter;
  public meta: Meta;
  public daterrange = {
    begin: null,
    end: null,
  };
  public search = '';
  public templateGroup = initialState.templateGroupData;
  public group_id = null;
  public offset: number;

  public pagination: TablePagination = {
    length: initialState.templateGroupMeta.total,
    pageIndex: initialState.templateGroupFilter.page,
    pageSize: initialState.templateGroupFilter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef,
    private route$: ActivatedRoute
  ) {
    this.filter$ = this.store$.select(templateGroupFilterSelector);
    this.meta$ = this.store$.select(templateGroupMetaSelector);
    this.didFetch$ = this.store$.select(templateGroupDidFetchSelector);
    this.fetching$ = this.store$.select(templateGroupFetchingSelector);
    this.templateGroup$ = this.store$.select(templateGroupDataSelector);
    this.offset = 0;
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
        this.onFilterChange();
      });

    this.route$.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.group_id = params.get('group_id');
      this.initData();
    });
  }

  initData() {
    this.filter$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(data => {
          if (!deepEqual(this.filter, data)) {
            this.filter = data;
            this.offset = (this.filter.page - 1) * this.filter.per_page;
            this.initFilter();
            if (this.filter.group_id !== this.group_id) {
              this.updateFilter({});
            }
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
        tap(didFetch => !didFetch && this.group_id && this.loadData())
      )
      .subscribe();

    this.templateGroup$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(templateGroup => {
          if (!deepEqual(this.templateGroup, templateGroup)) {
            this.templateGroup = templateGroup;
            this.refreshTable();
          }
        })
      )
      .subscribe();
  }

  refreshTable() {
    this.changeDetectorRefs$.detectChanges();
  }

  loadData() {
    const payload = {
      filter: {
        ...this.filter,
        group_id: this.group_id,
      },
    };
    this.store$.dispatch(new StatisticsActions.GetTemplateGroup(payload));
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
    this.changeDetectorRefs$.detectChanges();
  }

  initFilter() {
    this.daterrange = {
      begin: new Date(this.filter.start_date),
      end: new Date(this.filter.end_date),
    };
    this.search = this.filter.search;
  }

  onFilterChange(selectedDateRange?: { start_date: string, end_date: string }) {
    const {start_date, end_date} = selectedDateRange || {
      start_date: moment(this.daterrange.begin).format('YYYY-MM-DD 00:00:00'),
      end_date: moment(this.daterrange.end).format('YYYY-MM-DD 23:59:59')
    };
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
      group_id: this.group_id,
    };
    this.store$.dispatch(
      new StatisticsActions.UpdateTemplateGroupFilter(updated_filter)
    );
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  sortData(event) {
    if (event && event.active && this.sortableFields[event.active]) {
      const updated_filter = {
        order_by: event.active
          ? this.sortableFields[event.active]
          : initialState.templateGroupFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.templateGroupFilter.order_dir,
      };
      this.store$.dispatch(
        new StatisticsActions.UpdateTemplateGroupFilter(updated_filter)
      );
    }
  }
}
