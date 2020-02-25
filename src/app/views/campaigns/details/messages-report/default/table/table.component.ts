import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { MessageSent } from 'app/shared/models/campaign-statistics.models';
import { Filter } from 'app/shared/models/common.model';
import * as statisticAction from 'app/store/campaign-statistics/campaign-statistics.actions';
import {
  messageSentDidFetchSelector,
  messageSentFilterSelector,
  messageSentSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { initialState } from 'app/store/campaign-statistics/campaign-statistics.states';
import { CampaingMessageDetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-campaigns-details-messages-report-default-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class DefaultTableComponent implements OnInit, OnDestroy {
  columnHeaders: string[] = [
    'srNo',
    'didPool',
    'did',
    'craftedMessage',
    'messageTemplateGroup',
    'messageTemplate',
    'to',
    'sentAt',
    'actions',
  ];

  sortableFields: object = {
    didPool: 'did_pool',
    did: 'did',
    craftedMessage: 'crafted_message',
    messageTemplateGroup: 'template_group',
    messageTemplate: 'template',
    to: 'to',
    sentAt: 'sent_at',
  };

  private onDestroy$ = new Subject<void>();

  public messageSents$: Observable<any>;
  public didFetch$: Observable<any>;

  public messageSents: Array<MessageSent> = [];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.messageSents$ = this.store$.select(messageSentSelector);
    this.didFetch$ = this.store$.select(messageSentDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.messageSents$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(messageSents => {
          if (!deepEqual(this.messageSents, messageSents)) {
            this.messageSents = messageSents;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(messageSentFilterSelector)
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
          : initialState.messageSentFilter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.messageSentFilter.order_dir,
      };
      this.store$.dispatch(
        new statisticAction.UpdateMessageSentFilter(updated_filter)
      );
    }
  }

  onClickMore(item: MessageSent) {
    const title = 'Message Detail';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      CampaingMessageDetailModalComponent,
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
