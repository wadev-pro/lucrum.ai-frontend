import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'underscore';

import { CARRIER_BLACK_LIST } from 'app/core/constants';
import { CAMPAIGN } from 'app/core/errors';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getButtonStatus } from 'app/shared/helpers/campaign.helper';
import * as CampaignModel from 'app/shared/models/campaign.model';
import { TablePagination } from 'app/shared/models/common.model';
import { DomainPool } from 'app/shared/models/domain-pool.models';
import { CampaignService } from 'app/shared/services/apis/campaign.service';
import { CarrierBlackListService } from 'app/shared/services/apis/carrier-black-list.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store/';
import * as CampaignDetailActions from 'app/store/campaign-detail/campaign-detail.actions';
import {
  campaignIdSelector,
  dataSelector,
  didFetchSelector,
  isOldSelector,
} from 'app/store/campaign-detail/campaign-detail.selectors';
import * as CampaignActions from 'app/store/campaign/campaign.actions';
import * as DomainPoolActions from 'app/store/domain-pool/domain-pool.actions';
import { fetchingSelector as domainPoolFetchingSelector } from 'app/store/domain-pool/domain-pool.selectors';
import { dataSelector as processStatusDataSelector } from 'app/store/process-status/process-status.selectors';

@Component({
  selector: 'app-campaign-details-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.style.scss'],
  animations: egretAnimations,
})
export class InformationComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public didFetch$: Observable<any>;
  public campaignDetail$: Observable<any>;
  public campaignId$: Observable<any>;
  public processStatusList$: Observable<any>;
  public isOld$: Observable<any>;
  public domainPools$: Observable<any>;
  public domainPoolsFetching$: Observable<any>;

  public campaign_id: string;
  public isOld: boolean;
  public detail: CampaignModel.CampaignDetail;
  public selectedCarrierBlackList: Array<string>;
  public carrierBlackList: Array<object>;
  public domainPools: Array<DomainPool> = [];
  public filteredDomainPools: Array<DomainPool> = [];

  domainColumnHeaders: string[] = ['srNo', 'domain'];

  public pagination: TablePagination = {
    length: 0,
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
  };

  public processStatus: Object = {
    name: '',
    color: '',
  };

  public offset: number;
  getButtonStatus = getButtonStatus;
  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private carrierBlackList$: CarrierBlackListService,
    public confirmService$: AppConfirmService,
    public service$: CampaignService,
    private loader$: AppLoaderService
  ) {
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.campaignDetail$ = this.store$.select(dataSelector);
    this.processStatusList$ = this.store$.select(processStatusDataSelector);
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.isOld$ = this.store$.select(isOldSelector);
    this.domainPools$ = this.store$.select(state => state.domainPool.data);
    this.domainPoolsFetching$ = this.store$.select(domainPoolFetchingSelector);

    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.isOld = false;
    this.selectedCarrierBlackList = [];
    this.carrierBlackList = CARRIER_BLACK_LIST;
    this.isOld$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(isOld => {
          this.isOld = isOld;
        })
      )
      .subscribe();

    this.campaignId$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaign_id => {
          this.campaign_id = campaign_id;
          this.initData();
        })
      )
      .subscribe();

    combineLatest(this.campaignDetail$, this.processStatusList$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([detail, processStatusList]) => {
        if (!deepEqual(this.detail, detail)) {
          this.detail = detail;
        }
        if (processStatusList && detail.processingStatus) {
          const item = _.find(
            processStatusList,
            p_item => p_item.statusCode === detail.processingStatus
          );
          this.processStatus = {
            name: item.statusName,
            color: this.getProcessStatusColor(item.statusCode),
          };
        }
        this.changeDetectorRefs.detectChanges();
      });
  }

  initData() {
    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(
          didFetch =>
            !didFetch &&
            this.store$.dispatch(
              new CampaignDetailActions.GetDetail({
                campaign_id: this.campaign_id,
              })
            )
        )
      )
      .subscribe();

    this.carrierBlackList$
      .getByCampaignId(this.campaign_id)
      .pipe(
        map(result => {
          this.selectedCarrierBlackList = result;
        }),
        catchError(() => {
          return of(CAMPAIGN.ADD_ERROR);
        })
      )
      .subscribe();

    this.store$
      .select(state => state.domainPool.didFetch)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => {
          if (!didFetch) {
            const payload = {
              campaign_id: this.campaign_id,
            };
            this.store$.dispatch(new DomainPoolActions.GetList(payload));
          }
        })
      )
      .subscribe();

    this.domainPools$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(data => {
          this.domainPools = data;
          this.initFilter();
        })
      )
      .subscribe();
  }

  initFilter() {
    const data = {
      length: this.domainPools.length,
    };
    this.updatePagination(data);
  }

  onPaginateChange(event) {
    const data = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };
    this.updatePagination(data);
  }

  updatePagination(data) {
    const updated_pagination = {
      ...this.pagination,
      ...data,
    };
    this.pagination = updated_pagination;
    this.applyFilter();
  }

  applyFilter() {
    const from = this.pagination.pageIndex * this.pagination.pageSize,
      to = from + this.pagination.pageSize;
    this.offset = this.pagination.pageIndex * this.pagination.pageSize;
    this.filteredDomainPools = this.domainPools.slice(from, to);
  }

  getProcessStatusColor(statusCode: number) {
    let color = 'primary';
    if (_.contains([4, 9, 14], statusCode)) {
      color = 'accent';
    } else if (_.contains([8, 11, 12, 13, 15, 18], statusCode)) {
      color = 'warn';
    }
    return color;
  }

  getTemplateGroupName() {
    if (
      this.detail &&
      this.detail.messageTemplateGroup &&
      this.detail.messageTemplateGroup.name
    ) {
      return this.detail.messageTemplateGroup.name;
    } else {
      return '';
    }
  }

  getDidPoolName() {
    if (this.detail && this.detail.didPool && this.detail.didPool.name) {
      return this.detail.didPool.name;
    } else {
      return '';
    }
  }

  getCarrierSelected(type: string) {
    return this.selectedCarrierBlackList.includes(type);
  }

  checkCampaign() {
    this.confirmService$
      .confirm({
        title: 'Confirm Dialog',
        message: 'Are you sure you want to run quality check on this Campaign?',
      })
      .subscribe(result => {
        if (result) {
          this.checkCampaignAction();
          // const payload = {
          //   campaign_id: this.campaign_id
          // };
          // this.store$.dispatch(new CampaignActions.CheckCampaign(payload));
        }
      });
  }

  checkCampaignAction() {
    this.loader$.close();
    this.service$
      .checkCampaign(this.campaign_id)
      .pipe(
        map(result => {
          const payload = {
            processingStatus: 19,
          };
          this.store$.dispatch(new CampaignDetailActions.UpdateDetail(payload));
          this.store$.dispatch(
            new CampaignActions.CheckCampaignSuccess({
              campaign_id: this.campaign_id,
            })
          );
          this.loader$.close();
        }),
        catchError(() => {
          this.store$.dispatch(
            new CampaignDetailActions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
          this.store$.dispatch(
            new CampaignActions.CheckCampaignFailed({
              campaign_id: this.campaign_id,
            })
          );
          const payload = {
            processingStatus: 15,
          };
          this.store$.dispatch(new CampaignDetailActions.UpdateDetail(payload));
          this.loader$.close();
          return of(CAMPAIGN.ACTION_ERROR);
        })
      )
      .subscribe();
  }

  stopCheckCampaign(campaign: CampaignModel.Campaign) {
    this.confirmService$
      .confirm({
        title: 'Confirm Dialog',
        message:
          'Are you sure you want to stop quality check on this Campaign?',
      })
      .subscribe(result => {
        if (result) {
          this.stopCheckCampaignAction();
        }
      });
  }

  stopCheckCampaignAction() {
    this.loader$.close();
    this.service$
      .stopCheckCampaign(this.campaign_id)
      .pipe(
        map(result => {
          const payload = {
            processingStatus: 2,
          };
          this.store$.dispatch(new CampaignDetailActions.UpdateDetail(payload));
          this.store$.dispatch(
            new CampaignActions.StopCheckCampaignSuccess({
              campaign_id: this.campaign_id,
            })
          );
          this.loader$.close();
        }),
        catchError(() => {
          this.store$.dispatch(
            new CampaignDetailActions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
          this.store$.dispatch(
            new CampaignActions.StopCheckCampaignFailed({
              campaign_id: this.campaign_id,
            })
          );
          const payload = {
            processingStatus: 15,
          };
          this.store$.dispatch(new CampaignDetailActions.UpdateDetail(payload));
          this.loader$.close();
          return of(CAMPAIGN.ACTION_ERROR);
        })
      )
      .subscribe();
  }
}
