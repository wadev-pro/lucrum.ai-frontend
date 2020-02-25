import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { Tld, TldFilter } from 'app/shared/models/statistics.model';
import * as StatisticsActions from 'app/store/statistics/statistics.actions';
import {
  tldDataSelector,
  tldDidFetchSelector,
  tldFilterSelector,
} from 'app/store/statistics/statistics.selectors';
import { initialState } from 'app/store/statistics/statistics.states';

@Component({
  selector: 'app-statistics-tld-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class TldTableComponent implements OnInit, OnDestroy {

  levelHeaders = [
    'TLD', 'Domain', 'URL'
  ];
  
  columnHeaders: string[] = [
    'srNo',
    'tld',
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

  public tld$: Observable<any>;
  public didFetch$: Observable<any>;

  public tlds: Array<Tld>[];
  public filter: TldFilter;
  public offset: number;
  public hasNextLevel = true;
  public hasPreviousLevel = false;
  public levelHeader: string;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.tld$ = this.store$.select(tldDataSelector);
    this.didFetch$ = this.store$.select(tldDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.tld$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(tlds => {
          if (!deepEqual(this.tlds, tlds)) {
            this.tlds = tlds;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(tldFilterSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(filter => {
          this.filter = filter;
          this.offset = (filter.page - 1) * filter.per_page;
          this.hasNextLevel = filter.levels.length < 3;
          this.hasPreviousLevel = filter.levels.length > 1;
          this.levelHeader = this.levelHeaders[filter.levels.length - 1];
        })
      )
      .subscribe();
  }

  sortData(event) {
    if (event && event.active && this.sortableFields[event.active]) {
      const updated_filter = {
        order_by: event.active
          ? this.sortableFields[event.active]
          : initialState.tldFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.tldFilter.order_dir,
      };
      this.store$.dispatch(
        new StatisticsActions.UpdateTldFilter(updated_filter)
      );
    }
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }

  details(tld) {
    const filter = {
      levels: [
        ...this.filter.levels,
        tld
      ],
      page: 1,
      search: ''
    };
    this.store$.dispatch(
      new StatisticsActions.UpdateTldFilter(filter)
    );
  }

  navigate(index) {
    const filter = {
      levels: this.filter.levels.splice(0, index + 1),
      page: 1,
      search: ''
    };
    this.store$.dispatch(
      new StatisticsActions.UpdateTldFilter(filter)
    );
  }
}
