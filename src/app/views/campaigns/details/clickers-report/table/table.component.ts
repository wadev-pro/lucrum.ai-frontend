import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { Click } from 'app/shared/models/campaign-statistics.models';
import { Filter } from 'app/shared/models/common.model';
import * as statisticAction from 'app/store/campaign-statistics/campaign-statistics.actions';
import {
  clickDidFetchSelector,
  clickFilterSelector,
  clickSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';
import { CampaingClickerDetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-campaigns-details-clickers-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class ClickersReportTableComponent implements OnInit, OnDestroy {
  columnHeaders: string[] = [
    'srNo',
    'didPool',
    'did',
    'craftedMessage',
    'messageTemplate',
    'to',
    'device',
    'clickedAt',
    'actions',
  ];

  sortableFields: object = {
    didPool: 'did_pool',
    did: 'did',
    craftedMessage: 'crafted_message',
    messageTemplate: 'template',
    to: 'to',
    clickedAt: 'clicked_at',
    device: 'device',
    redirectUrl: 'redirect_url',
  };

  private onDestroy$ = new Subject<void>();

  public clicks$: Observable<any>;
  public didFetch$: Observable<any>;

  public clicks: Array<Click> = [];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.clicks$ = this.store$.select(clickSelector);
    this.didFetch$ = this.store$.select(clickDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.clicks$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(clicks => {
          if (!deepEqual(this.clicks, clicks)) {
            this.clicks = clicks;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(clickFilterSelector)
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
          : initialState.clickFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.clickFilter.order_dir,
      };
      this.store$.dispatch(
        new statisticAction.UpdateClickFilter(updated_filter)
      );
    }
  }

  onClickMore(item: Click) {
    const title = 'Message Click Detail';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      CampaingClickerDetailModalComponent,
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
