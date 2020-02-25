import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';
import * as CampaignStatisticsActions from 'app/store/campaign-statistics/campaign-statistics.actions';

import { Did } from 'app/shared/models/campaign-statistics.models';
import { Filter } from 'app/shared/models/common.model';
import * as statisticAction from 'app/store/campaign-statistics/campaign-statistics.actions';
import {
  didDidFetchSelector,
  didFilterSelector,
  didSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';

@Component({
  selector: 'app-campaigns-details-statistics-did-statistics-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class DidStatisticsTableComponent implements OnInit, OnDestroy {
  columnHeaders: string[] = [
    'srNo',
    'did',
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
    did: 'did',
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

  public did$: Observable<any>;
  public didFetch$: Observable<any>;

  public dids: Array<Did> = [];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.did$ = this.store$.select(didSelector);
    this.didFetch$ = this.store$.select(didDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.did$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(dids => {
          if (!deepEqual(this.dids, dids)) {
            this.dids = dids;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(didFilterSelector)
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
          : initialState.didFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.didFilter.order_dir,
      };
      this.store$.dispatch(new statisticAction.UpdateDidFilter(updated_filter));
    }
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
