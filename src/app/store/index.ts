import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { AuthenticationEffects } from './auth/authentication.effect';
import { CampaignDetailEffects } from './campaign-detail/campaign-detail.effects';
import { CampaignStatisticsEffects } from './campaign-statistics/campaign-statistics.effects';
import { CampaignEffects } from './campaign/campaign.effects';
import { DashboardEffects } from './dashboard/dashboard.effects';
import { DidPoolEffects } from './did-pool/did-pool.effects';
import { DidEffects } from './did/did.effects';
import { DomainPoolEffects } from './domain-pool/domain-pool.effects';
import { EventHistoryEffects } from './event-history/event-history.effects';
import { GatewayProviderEffects } from './gateway-provider/gateway-provider.effects';
import { MessageTemplateGroupEffects } from './message-template-group/message-template-group.effects';
import { MessageTemplateEffects } from './message-template/message-template.effects';
import { ProcessStatusEffects } from './process-status/process-status.effects';
import { ReportStatusEffects } from './report-status/report-status.effects';
import { ReportsEffects } from './report/report.effects';
import { RouterEffects } from './router/router.effect';
import { SeedNumberEffects } from './seed-number/seed-number.effects';
import { StatisticsEffects } from './statistics/statistics.effects';
import { UploaderStatusEffects } from './uploader-status/uploader-status.effects';
import { UserEffects } from './users/users.effects';
import { RechargeEffects } from './billing/recharge/recharge.effects';
import { CardEffects } from './billing/cards/card.effects';
import { PaymentEffects } from './billing/payment/payment.effects';

import { AuthenticationState } from './auth/authentication.state';
import { CampaignDetailState } from './campaign-detail/campaign-detail.states';
import { CampaignStatisticsState } from './campaign-statistics/campaign-statistics.states';
import { CampaignState } from './campaign/campaign.states';
import { DashboardState } from './dashboard/dashboard.states';
import { DidPoolState } from './did-pool/did-pool.states';
import { DidState } from './did/did.states';
import { DomainPoolState } from './domain-pool/domain-pool.states';
import { ErrorState } from './error/error.states';
import { EventHistoryState } from './event-history/event-history.states';
import { GatewayProviderState } from './gateway-provider/gateway-provider.states';
import { MessageTemplateGroupState } from './message-template-group/message-template-group.states';
import { MessageTemplateState } from './message-template/message-template.states';
import { ProcessStatusState } from './process-status/process-status.states';
import { ReportStatusState } from './report-status/report-status.states';
import { ReportsState } from './report/report.states';
import { RouterStateUrl } from './router/router.state';
import { SeedNumberState } from './seed-number/seed-number.states';
import { StatisticsState } from './statistics/statistics.states';
import { UploaderStatusState } from './uploader-status/uploader-status.states';
import { UsersState } from './users/users.states';
import { RechargeState } from './billing/recharge/recharge.states';
import { CardState } from './billing/cards/card.states';
import { PaymentState } from './billing/payment/payment.states';

import { authenticationReducer } from './auth/authentication.reducer';
import { campaignDetailReducer } from './campaign-detail/campaign-detail.reducers';
import { campaignStatisticsReducer } from './campaign-statistics/campaign-statistics.reducers';
import { campaignReducer } from './campaign/campaign.reducers';
import { dashboardReducer } from './dashboard/dashboard.reducers';
import { didPoolReducer } from './did-pool/did-pool.reducers';
import { didReducer } from './did/did.reducers';
import { domainPoolReducer } from './domain-pool/domain-pool.reducers';
import { errorReducer } from './error/error.reducers';
import { eventHistoryReducer } from './event-history/event-history.reducers';
import { gatewayProviderReducer } from './gateway-provider/gateway-provider.reducers';
import { messageTemplateGroupReducer } from './message-template-group/message-template-group.reducers';
import { messageTemplateReducer } from './message-template/message-template.reducers';
import { processStautsReducer } from './process-status/process-status.reducers';
import { reportStatusReducer } from './report-status/report-status.reducers';
import { reportsReducer } from './report/report.reducers';
import { seedNumberReducer } from './seed-number/seed-number.reducers';
import { statisticsReducer } from './statistics/statistics.reducers';
import { uploaderStautsReducer } from './uploader-status/uploader-status.reducers';
import { usersReducer } from './users/users.reducers';
import { rechargeReducer } from './billing/recharge/recharge.reducers';
import { cardReducer } from './billing/cards/card.reducers';
import { paymentReducer } from './billing/payment/payment.reducers';

import { CampaignService } from '../shared/services/apis/campaign.service';
import { DashboardService } from '../shared/services/apis/dashboard.service';
import { DidPoolService } from '../shared/services/apis/did-pool.service';
import { DidUploadService } from '../shared/services/apis/did-upload.service';
import { DidsService } from '../shared/services/apis/dids.service';
import { DomainPoolService } from '../shared/services/apis/domain-pool.service';
import { MessageGatewayProviderService } from '../shared/services/apis/message-gateway-provider.service';
import { MessageTemplateGroupService } from '../shared/services/apis/message-template-group.service';
import { MessageTemplateService } from '../shared/services/apis/message-template.service';
import { ProcessStatusService } from '../shared/services/apis/process-status.service';
import { ReportsService } from '../shared/services/apis/reports.service';
import { SeedNumberService } from '../shared/services/apis/seed-number.service';
import { StatisticsService } from '../shared/services/apis/statistics.service';
import { UserService } from '../shared/services/apis/users.service';
import { CardService } from '../shared/services/apis/card.service';
import { RechargeService } from '../shared/services/apis/recharge.service';
import { PaymentService } from '../shared/services/apis/payment.service';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  authentication: AuthenticationState;
  dashboard: DashboardState;
  campaign: CampaignState;
  campaignDetail: CampaignDetailState;
  campaignStatistics: CampaignStatisticsState;
  processStatus: ProcessStatusState;
  uploaderStatus: UploaderStatusState;
  didPool: DidPoolState;
  did: DidState;
  domainPool: DomainPoolState;
  messageTemplateGroup: MessageTemplateGroupState;
  messageTemplate: MessageTemplateState;
  eventHistory: EventHistoryState;
  statistics: StatisticsState;
  reports: ReportsState;
  gatewayProvider: GatewayProviderState;
  seedNumber: SeedNumberState;
  users: UsersState;
  payment: PaymentState;
  card: CardState,
  recharge: RechargeState,
  errors: ErrorState;
  reportStatus: ReportStatusState;
}

export const rootEffects: any[] = [RouterEffects, AuthenticationEffects];

export const effects: any[] = [
  RouterEffects,
  AuthenticationEffects,
  CampaignEffects,
  CampaignDetailEffects,
  DashboardEffects,
  ProcessStatusEffects,
  UploaderStatusEffects,
  DidPoolEffects,
  DidEffects,
  DomainPoolEffects,
  MessageTemplateGroupEffects,
  MessageTemplateEffects,
  EventHistoryEffects,
  CampaignStatisticsEffects,
  StatisticsEffects,
  ReportsEffects,
  GatewayProviderEffects,
  SeedNumberEffects,
  UserEffects,
  ReportStatusEffects,
  PaymentEffects,
  CardEffects,
  RechargeEffects
];

export const services: any[] = [
  DashboardService,
  CampaignService,
  ProcessStatusService,
  DidPoolService,
  DidsService,
  DidUploadService,
  DomainPoolService,
  MessageTemplateGroupService,
  MessageTemplateService,
  StatisticsService,
  MessageGatewayProviderService,
  SeedNumberService,
  UserService,
  PaymentService,
  ReportsService,
  CardService,
  RechargeService
];

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  authentication: authenticationReducer,
  dashboard: dashboardReducer,
  campaign: campaignReducer,
  campaignDetail: campaignDetailReducer,
  processStatus: processStautsReducer,
  uploaderStatus: uploaderStautsReducer,
  didPool: didPoolReducer,
  did: didReducer,
  domainPool: domainPoolReducer,
  messageTemplateGroup: messageTemplateGroupReducer,
  messageTemplate: messageTemplateReducer,
  eventHistory: eventHistoryReducer,
  campaignStatistics: campaignStatisticsReducer,
  statistics: statisticsReducer,
  reports: reportsReducer,
  gatewayProvider: gatewayProviderReducer,
  seedNumber: seedNumberReducer,
  users: usersReducer,
  payment: paymentReducer,
  errors: errorReducer,
  reportStatus: reportStatusReducer,
  card: cardReducer,
  recharge: rechargeReducer
};
