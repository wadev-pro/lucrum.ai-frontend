import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as _ from 'underscore';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getButtonStatus } from 'app/shared/helpers/campaign.helper';
import {
  getCurrentUTCTime,
  getProcessingStatusColor,
} from 'app/shared/helpers/utils';
import {
  Campaign,
  CampaignAction,
  ProcessStatus,
} from 'app/shared/models/campaign.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppState } from 'app/store/';
import * as CampaignActions from 'app/store/campaign/campaign.actions';
import { dataSelector } from 'app/store/campaign/campaign.selectors';
import { initialState } from 'app/store/campaign/campaign.states';
import { dataSelector as processStatusDataSelector } from 'app/store/process-status/process-status.selectors';
import { CampaignActionModalComponent } from './action-modal/action-modal.component';

@Component({
  selector: 'app-campaigns-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class TableComponent implements OnInit, OnDestroy {
  filterableFields: object = {
    name: 'name',
    processingStatus: 'processing_status',
    created: 'created_at',
  };

  public columnHeaders: string[] = [
    'srNo',
    'name',
    'processingStatus',
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
    'created',
    'actions',
  ];

  private onDestroy$ = new Subject<void>();

  public campaigns$: Observable<any>;
  public processStatus$: Observable<any>;

  public campaigns: Array<Campaign> = [];
  public processStatusList: Array<ProcessStatus> = [];
  getProcessingStatusColor = getProcessingStatusColor;
  getButtonStatus = getButtonStatus;

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
    public confirmService$: AppConfirmService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.campaigns$ = this.store$.select(dataSelector);
    this.processStatus$ = this.store$.select(processStatusDataSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.processStatus$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(processStatusList => {
          if (!deepEqual(this.processStatusList, processStatusList)) {
            this.processStatusList = processStatusList;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.campaigns$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaigns => {
          if (!deepEqual(this.campaigns, campaigns)) {
            this.campaigns = campaigns;
            this.refreshTable();
          }
        })
      )
      .subscribe();
  }

  getProcessingStatus(statusCode: number) {
    const data = this.processStatusList.filter(
      item => item.statusCode === statusCode
    );
    if (data && data[0]) {
      return data[0].statusName;
    } else {
      return 'NA';
    }
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }

  runCampaign(campaign: Campaign) {
    const title = `Start Campaign - (${campaign.name})`;
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      CampaignActionModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: {}, type: 'run' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const payload = {
        campaignId: campaign.campaign_id,
        batchSize: res.batchSize,
      };
      this.store$.dispatch(new CampaignActions.StartCampaign(payload));
    });
  }

  testCampaign(campaign: Campaign) {
    const title = `Test Campaign - (${campaign.name})`;
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      CampaignActionModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: {}, type: 'test' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const payload = {
        campaignId: campaign.campaign_id,
        batchSize: res.batchSize,
      };
      this.store$.dispatch(new CampaignActions.TestCampaign(payload));
    });
  }

  stopCampaign(campaign: Campaign) {
    this.confirmService$
      .confirm({
        title: 'Confirm Dialog',
        message: 'Are you sure you want to stop this Campaign?',
      })
      .subscribe(result => {
        if (result) {
          const payload = {
            campaign_id: campaign.campaign_id,
          };
          this.store$.dispatch(new CampaignActions.StopCampaign(payload));
        }
      });
  }

  deleteCampaignJob(campaign: Campaign) {
    this.confirmService$
      .confirm({
        title: 'Confirm Dialog',
        message: 'Are you sure you want to delete Campaign Job?',
      })
      .subscribe(result => {
        if (result) {
          const payload = {
            campaign_id: campaign.campaign_id,
          };
          this.store$.dispatch(new CampaignActions.DeleteCampaignJob(payload));
        }
      });
  }

  sortData(event) {
    if (event && event.active && this.filterableFields[event.active]) {
      const updated_filter = {
        order_by: event.active
          ? this.filterableFields[event.active]
          : initialState.filter.order_by,
        order_dir: event.direction
          ? event.direction
          : initialState.filter.order_dir,
      };
      this.store$.dispatch(new CampaignActions.UpdateFilter(updated_filter));
    }
  }
}
