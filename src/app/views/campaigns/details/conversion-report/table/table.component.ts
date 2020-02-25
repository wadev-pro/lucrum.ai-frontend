import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { Conversion } from 'app/shared/models/campaign-statistics.models';
import { Filter } from 'app/shared/models/common.model';
import * as statisticAction from 'app/store/campaign-statistics/campaign-statistics.actions';
import {
  conversionDidFetchSelector,
  conversionFilterSelector,
  conversionSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';
import { CampaingConversionDetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-campaigns-details-conversion-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class CampaignCenversionReportTableComponent
  implements OnInit, OnDestroy {
  columnHeaders: string[] = [
    'srNo',
    'didPool',
    'did',
    'craftedMessage',
    'messageTemplate',
    'amount',
    'to',
    'actions',
  ];

  sortableFields: object = {
    didPool: 'did_pool',
    did: 'did',
    craftedMessage: 'crafted_message',
    messageTemplate: 'template',
    to: 'to',
    recievedAt: 'received_at',
    device: 'device',
    redirectUrl: 'redirect_url',
    amount: 'amount',
  };

  private onDestroy$ = new Subject<void>();

  public conversions$: Observable<any>;
  public didFetch$: Observable<any>;

  public conversions: Array<Conversion> = [];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.conversions$ = this.store$.select(conversionSelector);
    this.didFetch$ = this.store$.select(conversionDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.conversions$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(conversions => {
          if (!deepEqual(this.conversions, conversions)) {
            this.conversions = conversions;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(conversionFilterSelector)
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
          : initialState.conversionFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.conversionFilter.order_dir,
      };
      this.store$.dispatch(
        new statisticAction.UpdateConversionFilter(updated_filter)
      );
    }
  }

  onClickMore(item: Conversion) {
    const title = 'Message Conversion Detail';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      CampaingConversionDetailModalComponent,
      {
        width: '540px',
        disableClose: false,
        data: { title: title, payload: item },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
    });
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
