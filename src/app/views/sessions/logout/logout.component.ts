import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store';

import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { ClearDetail as campaignDetailClearDetail } from 'app/store/campaign-detail/campaign-detail.actions';
import { ClearDetail as campaignStatisticsClearDetail } from 'app/store/campaign-statistics/campaign-statistics.actions';
import { ClearDetail as campaignClearDetail } from 'app/store/campaign/campaign.actions';
import { ClearDetail as dashboardClearDetail } from 'app/store/dashboard/dashboard.actions';
import { ClearDetail as didPoolClearDetail } from 'app/store/did-pool/did-pool.actions';
import { ClearDetail as didClearDetail } from 'app/store/did/did.actions';
import { ClearDetail as domainPoolClearDetail } from 'app/store/domain-pool/domain-pool.actions';
import { ClearDetail as eventHistoryClearDetail } from 'app/store/event-history/event-history.actions';
import { ClearDetail as gatewayProviderClearDetail } from 'app/store/gateway-provider/gateway-provider.actions';
import { ClearDetail as messageTemplateGroupClearDetail } from 'app/store/message-template-group/message-template-group.actions';
import { ClearDetail as messageTemplateClearDetail } from 'app/store/message-template/message-template.actions';
import { ClearDetail as processStatusClearDetail } from 'app/store/process-status/process-status.actions';
import * as routerActions from 'app/store/router/router.action';
import { ClearDetail as seedNumberClearDetail } from 'app/store/seed-number/seed-number.actions';
import { ClearDetail as statisticsClearDetail } from 'app/store/statistics/statistics.actions';
import { ClearDetail as uploaderStatusClearDetail } from 'app/store/uploader-status/uploader-status.actions';
import { ClearDetail as usersClearDetail } from 'app/store/users/users.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private store$: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.localStorageService.clear();
    this.store$.dispatch(new campaignDetailClearDetail());
    this.store$.dispatch(new campaignStatisticsClearDetail());
    this.store$.dispatch(new campaignClearDetail());
    this.store$.dispatch(new dashboardClearDetail());
    this.store$.dispatch(new didPoolClearDetail());
    this.store$.dispatch(new domainPoolClearDetail());
    this.store$.dispatch(new eventHistoryClearDetail());
    this.store$.dispatch(new messageTemplateGroupClearDetail());
    this.store$.dispatch(new processStatusClearDetail());
    this.store$.dispatch(new statisticsClearDetail());
    this.store$.dispatch(new messageTemplateClearDetail());
    this.store$.dispatch(new didClearDetail());
    this.store$.dispatch(new gatewayProviderClearDetail());
    this.store$.dispatch(new uploaderStatusClearDetail());
    this.store$.dispatch(new seedNumberClearDetail());
    this.store$.dispatch(new usersClearDetail());

    this.store$.dispatch(new routerActions.Go({ path: ['sessions/signin'] }));
  }
}
