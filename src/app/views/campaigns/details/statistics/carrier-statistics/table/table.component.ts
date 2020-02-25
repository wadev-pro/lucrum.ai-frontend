import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { Carrier } from 'app/shared/models/campaign-statistics.models';
import { Filter } from 'app/shared/models/common.model';
import * as statisticAction from 'app/store/campaign-statistics/campaign-statistics.actions';
import {
  carrierDidFetchSelector,
  carrierFilterSelector,
  carrierSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';

@Component({
  selector: 'app-campaigns-details-statistics-carrier-statistics-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class CarrierStatisticsTableComponent implements OnInit, OnDestroy {
  columnHeaders: string[] = [
    'srNo',
    'carrier',
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
    carrier: 'carrier',
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

  public carrier$: Observable<any>;
  public didFetch$: Observable<any>;

  public carriers: Array<Carrier> = [];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.carrier$ = this.store$.select(carrierSelector);
    this.didFetch$ = this.store$.select(carrierDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.carrier$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(carriers => {
          if (!deepEqual(this.carriers, carriers)) {
            this.carriers = carriers;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(carrierFilterSelector)
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
          : initialState.carrierFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.carrierFilter.order_dir,
      };
      this.store$.dispatch(
        new statisticAction.UpdateCarrierFilter(updated_filter)
      );
    }
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
