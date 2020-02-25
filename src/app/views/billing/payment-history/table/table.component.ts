import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getBoolColor } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { PaymentModel } from 'app/shared/models/payment.model';
import { AppState } from 'app/store/';
import * as actions from 'app/store/billing/payment/payment.actions';
import {
  dataSelector,
  didFetchSelector,
  filterSelector,
} from 'app/store/billing/payment/payment.selectors';
import { initialState } from 'app/store/billing/payment/payment.states';

@Component({
  selector: 'app-history-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class HistoryTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = [
    'date',
    'method',
    'description',
    'status',
    'amount',
  ];

  columnHeaders: string[] = [
    'srNo',
    'date',
    'method',
    'description',
    'status',
    'amount'
  ];

  private onDestroy$ = new Subject<void>();

  public payments$: Observable<any>;
  public filter$: Observable<any>;
  public didFetch$: Observable<any>;

  public payments: Array<PaymentModel> = [];
  public filter: commonModels.Filter;
  public offset: number;
  getBoolColor = getBoolColor;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.payments$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.payments$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(payments => {
          if (!deepEqual(this.payments, payments)) {
            this.payments = payments;
            this.refreshTable();
          }
        })
      )
      .subscribe();
  }

  sortData(event) {
    const updated_filter = {
      order_by: event.active ? event.active : initialState.filter.order_by,
      order_dir: event.direction
        ? event.direction
        : initialState.filter.order_dir,
    };
    this.store$.dispatch(new actions.UpdateFilter(updated_filter));
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
