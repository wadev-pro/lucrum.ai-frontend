import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { Tld } from 'app/shared/models/campaign-statistics.models';
import { Filter } from 'app/shared/models/common.model';
import * as statisticAction from 'app/store/campaign-statistics/campaign-statistics.actions';
import {
  tldFilterSelector,
  tldSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';

@Component({
  selector: 'app-campaigns-details-statistics-tld-statistics-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class TldStatisticsTableComponent implements OnInit, OnDestroy {
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
    tld: 'tld',
    messagesSent: 'sentcount',
    mobileClicks: 'mobileclick',
    otherClicks: 'otherclick',
    conversionCount: 'conversioncount',
    cost: 'cost',
    revenue: 'revenue',
    optRate: 'opt_rate',
    complainerRate: 'complainer_rate',
    replyRate: 'reply_rate',
  };

  private onDestroy$ = new Subject<void>();

  public tld$: Observable<any>;

  public tlds: Array<Tld> = [];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.tld$ = this.store$.select(tldSelector);
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
      this.store$.dispatch(new statisticAction.UpdateTldFilter(updated_filter));
    }
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
