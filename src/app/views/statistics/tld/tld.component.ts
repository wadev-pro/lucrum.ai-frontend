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
import {
  DateTimeService,
  IDateRange,
  IDateRangeSelection,
} from '../../../shared/services/date-time.service';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Meta } from 'app/shared/models/common.model';
import { TldFilter } from 'app/shared/models/statistics.model';
import { TablePagination } from 'app/shared/models/common.model';
import { AppState } from 'app/store/';
import * as StatisticsActions from 'app/store/statistics/statistics.actions';
import { initialState } from 'app/store/statistics/statistics.states';

import {
  tldDidFetchSelector,
  tldFetchingSelector,
  tldFilterSelector,
  tldMetaSelector,
} from 'app/store/statistics/statistics.selectors';

@Component({
  selector: 'app-statistics-tld',
  templateUrl: './tld.component.html',
  styleUrls: ['./tld.style.css'],
  animations: egretAnimations,
})
export class TldComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;

  public filter: TldFilter;
  public meta: Meta;
  public daterrange: IDateRange;
  public search = '';

  public pagination: TablePagination = {
    length: initialState.tldMeta.total,
    pageIndex: initialState.tldFilter.page,
    pageSize: initialState.tldFilter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef,
    private dateTimeService: DateTimeService
  ) {
    this.daterrange = this.dateTimeService.getDefaultDateRange();
    this.filter$ = this.store$.select(tldFilterSelector);
    this.meta$ = this.store$.select(tldMetaSelector);
    this.didFetch$ = this.store$.select(tldDidFetchSelector);
    this.fetching$ = this.store$.select(tldFetchingSelector);
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
        filter(res => res.length > 1 || !res.length),
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
    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();
  }

  loadData() {
    const payload = {
      filter: this.filter,
    };
    this.store$.dispatch(new StatisticsActions.GetTld(payload));
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
    this.store$.dispatch(new StatisticsActions.UpdateTldFilter(updated_filter));
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }
}
