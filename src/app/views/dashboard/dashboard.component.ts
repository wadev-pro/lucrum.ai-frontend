import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { DASHBOARD_DATES } from 'app/core/constants';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Statistics } from 'app/shared/models/dashboard.model';
import { AppState } from 'app/store/';
import * as DashboardActions from 'app/store/dashboard/dashboard.actions';
import * as PaymentActions from 'app/store/billing/payment/payment.actions';

import {
  didFetchSelector,
  fetchingSelector,
  statisticsFilter,
  statisticsSelector,
} from 'app/store/dashboard/dashboard.selectors';
import {
  dataSelector as paymentDataSelector,
  didFetchSelector as paymentDidFetchSelector,
} from 'app/store/billing/payment/payment.selectors';
import {
  IDateRange,
  IDateRangeSelection,
} from '../../shared/services/date-time.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: egretAnimations,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public balance$: Observable<any>;
  public paymentDidFetch$: Observable<any>;
  public statistics$: Observable<any>;
  public filter$: Observable<any>;
  public fetching$: Observable<any>;
  public didFetch$: Observable<any>;

  public loadingBalance: boolean = false;
  public balance: number;
  public selectedDate: any;
  public daterrange: IDateRange;
  public dates = [];
  public filter: any = null;
  public statistic: Statistics;

  constructor(private store$: Store<AppState>) {
    this.balance$ = this.store$.select(paymentDataSelector);
    this.paymentDidFetch$ = this.store$.select(paymentDidFetchSelector);
    this.statistics$ = this.store$.select(statisticsSelector);
    this.filter$ = this.store$.select(statisticsFilter);
    this.fetching$ = this.store$.select(fetchingSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.dates = DASHBOARD_DATES;

    this.balance$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(balanceInfo => {
          if (balanceInfo && balanceInfo.length && !deepEqual(this.balance, balanceInfo[0].amount)) {
            this.balance = balanceInfo[0].amount;
            this.loadingBalance = false;
          }
        })
      )
      .subscribe();
    this.paymentDidFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadBalance())
      )
      .subscribe();

    combineLatest(this.filter$, this.didFetch$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([filter, didFetch]) => {
        if (!deepEqual(this.filter, filter)) {
          const prevFilter = this.filter;
          this.filter = filter;
          this.daterrange = {
            begin: new Date(this.filter.start_date),
            end: new Date(this.filter.end_date),
          };
          if (!didFetch || prevFilter) {
            this.loadData();
          }
        }
      });
  }

  onChangeDaterange(selectedDateRange: IDateRangeSelection) {
    this.updateFilter(selectedDateRange);
  }

  updateFilter(data) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.store$.dispatch(new DashboardActions.UpdateFilter(updated_filter));
  }

  loadData() {
    this.store$.dispatch(new DashboardActions.GetStatistics(this.filter));
  }

  loadBalance () {
    this.loadingBalance = true;
    this.store$.dispatch(new PaymentActions.LoadBalance());
  }
}
