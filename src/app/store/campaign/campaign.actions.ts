import { Action } from '@ngrx/store';
import * as campaignModels from 'app/shared/models/campaign.model';

//#region Update Filter
export const UPDATE_FILTER = '@lc/campaign/update-filter';
export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Get Campaign List
export const GET_LIST = '@lc/campaign/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor(public payload: campaignModels.CampaignFilter) {}
}
//#endregion

//#region Get List Successful
export const GET_LIST_SUCCESSFUL = '@lc/campaign/get-list-successful';
export class GetListSuccesful implements Action {
  readonly type = GET_LIST_SUCCESSFUL;
  constructor(public payload: campaignModels.CampaignResponse) {}
}
//#endregion

//#region Get List Failed
export const GET_LIST_FAILED = '@lc/campaign/get-list-failed';
export interface GetListFailedPayload {
  error: string;
}
export class GetListFailed implements Action {
  readonly type = GET_LIST_FAILED;
  constructor(public payload: GetListFailedPayload) {}
}
//#endregion

//#region Get Statistics
export const GET_STATISTICS = '@lc/campaign/get-statistics';
export interface GetStatisticsPayload {
  campaign_ids: Array<string>;
}
export class GetStatistics implements Action {
  readonly type = GET_STATISTICS;
  constructor(public payload: GetStatisticsPayload) {}
}
//#endregion

//#region Get Statistics Successful
export const GET_STATISTICS_SUCCESSFUL =
  '@lc/campaign/get-statistics-successful';
export class GetStatisticsSuccesful implements Action {
  readonly type = GET_STATISTICS_SUCCESSFUL;
  constructor(public payload: Array<campaignModels.CampaignStatistics>) {}
}
//#endregion

//#region Get Statistics Failed
export const GET_STATISTICS_FAILED = '@lc/campaign/get-statistics-failed';
export interface GetStatisticsFailedPayload {
  error: string;
}
export class GetStatisticsFailed implements Action {
  readonly type = GET_STATISTICS_FAILED;
  constructor(public payload: GetStatisticsFailedPayload) {}
}
//#endregion

//#region Update Item
export const UPDATE_ITEM = '@lc/campaign/update-item';
export interface UpdateItemPayload {
  campaign_id: string;
  data: object;
}
export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;
  constructor(public payload: UpdateItemPayload) {}
}
//#endregion

//#region Start Campaign
export const START_CAMPAIGN = '@lc/campaign/start-campaign';
export interface StartCampaignPayload {
  campaign_id: string;
  batch_size: number;
}
export class StartCampaign implements Action {
  readonly type = START_CAMPAIGN;
  constructor(public payload: any) {}
}
//#endregion

//#region Start Campaign Success
export const START_CAMPAIGN_SUCCESS = '@lc/campaign/start-campaign-success';
export interface StartCampaignSuccessPayload {
  campaign_id: string;
}
export class StartCampaignSuccess implements Action {
  readonly type = START_CAMPAIGN_SUCCESS;
  constructor(public payload: StartCampaignSuccessPayload) {}
}
//#endregion

//#region Start Campaign Failed
export const START_CAMPAIGN_FAILED = '@lc/campaign/start-campaign-failed';
export interface StartCampaignFailedPayload {
  campaign_id: string;
}
export class StartCampaignFailed implements Action {
  readonly type = START_CAMPAIGN_FAILED;
  constructor(public payload: StartCampaignFailedPayload) {}
}
//#endregion

//#region Stop Campaign
export const STOP_CAMPAIGN = '@lc/campaign/stop-campaign';
export interface StopCampaignPayload {
  campaign_id: string;
}
export class StopCampaign implements Action {
  readonly type = STOP_CAMPAIGN;
  constructor(public payload: StopCampaignPayload) {}
}
//#endregion

//#region Stop Campaign Success
export const STOP_CAMPAIGN_SUCCESS = '@lc/campaign/stop-campaign-success';
export interface StopCampaignSuccessPayload {
  campaign_id: string;
}
export class StopCampaignSuccess implements Action {
  readonly type = STOP_CAMPAIGN_SUCCESS;
  constructor(public payload: StopCampaignSuccessPayload) {}
}
//#endregion

//#region Stop Campaign Failed
export const STOP_CAMPAIGN_FAILED = '@lc/campaign/stop-campaign-failed';
export interface StopCampaignFailedPayload {
  campaign_id: string;
}
export class StopCampaignFailed implements Action {
  readonly type = STOP_CAMPAIGN_FAILED;
  constructor(public payload: StopCampaignFailedPayload) {}
}
//#endregion

//#region Mark Campaign as stopped
export const MARK_CAMPAIGN_STOPPED = '@lc/campaign/mark-campaign-stopped';
export interface MarkCampaignStoppedPayload {
  campaign_id: string;
}
export class MarkCampaignStopped implements Action {
  readonly type = MARK_CAMPAIGN_STOPPED;
  constructor(public payload: MarkCampaignStoppedPayload) {}
}
//#endregion

//#region Mark Campaign as stopped Success
export const MARK_CAMPAIGN_STOPPED_SUCCESS =
  '@lc/campaign/mark-campaign-stopped-success';
export interface MarkCampaignStoppedSuccessPayload {
  campaign_id: string;
}
export class MarkCampaignStoppedSuccess implements Action {
  readonly type = MARK_CAMPAIGN_STOPPED_SUCCESS;
  constructor(public payload: MarkCampaignStoppedSuccessPayload) {}
}
//#endregion

//#region Mark Campaign as stopped Failed
export const MARK_CAMPAIGN_STOPPED_FAILED =
  '@lc/campaign/mark-campaign-stopped-failed';
export interface MarkCampaignStoppedFailedPayload {
  campaign_id: string;
}
export class MarkCampaignStoppedFailed implements Action {
  readonly type = MARK_CAMPAIGN_STOPPED_FAILED;
  constructor(public payload: MarkCampaignStoppedFailedPayload) {}
}
//#endregion

//#region Test Campaign
export const TEST_CAMPAIGN = '@lc/campaign/test-campaign';
export interface TestCampaignPayload {
  campaign_id: string;
  batch_size: number;
}
export class TestCampaign implements Action {
  readonly type = TEST_CAMPAIGN;
  constructor(public payload: any) {}
}
//#endregion

//#region Test Campaign Success
export const TEST_CAMPAIGN_SUCCESS = '@lc/campaign/test-campaign-success';
export interface TestCampaignSuccessPayload {
  campaign_id: string;
}
export class TestCampaignSuccess implements Action {
  readonly type = TEST_CAMPAIGN_SUCCESS;
  constructor(public payload: TestCampaignSuccessPayload) {}
}
//#endregion

//#region Test Campaign Failed
export const TEST_CAMPAIGN_FAILED = '@lc/campaign/test-campaign-failed';
export interface TestCampaignFailedPayload {
  campaign_id: string;
}
export class TestCampaignFailed implements Action {
  readonly type = TEST_CAMPAIGN_FAILED;
  constructor(public payload: TestCampaignFailedPayload) {}
}
//#endregion

//#region Check Campaign
export const CHECK_CAMPAIGN = '@lc/campaign/check-campaign';
export interface CheckCampaignPayload {
  campaign_id: string;
}
export class CheckCampaign implements Action {
  readonly type = CHECK_CAMPAIGN;
  constructor(public payload: CheckCampaignPayload) {}
}
//#endregion

//#region Check Campaign Success
export const CHECK_CAMPAIGN_SUCCESS = '@lc/campaign/check-campaign-success';
export interface CheckCampaignSuccessPayload {
  campaign_id: string;
}
export class CheckCampaignSuccess implements Action {
  readonly type = CHECK_CAMPAIGN_SUCCESS;
  constructor(public payload: CheckCampaignSuccessPayload) {}
}
//#endregion

//#region Check Campaign Failed
export const CHECK_CAMPAIGN_FAILED = '@lc/campaign/check-campaign-failed';
export interface CheckCampaignFailedPayload {
  campaign_id: string;
}
export class CheckCampaignFailed implements Action {
  readonly type = CHECK_CAMPAIGN_FAILED;
  constructor(public payload: CheckCampaignFailedPayload) {}
}
//#endregion

//#region Stop Check Campaign
export const STOP_CHECK_CAMPAIGN = '@lc/campaign/stop-check-campaign';
export interface StopCheckCampaignPayload {
  campaign_id: string;
}
export class StopCheckCampaign implements Action {
  readonly type = STOP_CHECK_CAMPAIGN;
  constructor(public payload: StopCheckCampaignPayload) {}
}
//#endregion

//#region Stop Check Campaign Success
export const STOP_CHECK_CAMPAIGN_SUCCESS =
  '@lc/campaign/stop-check-campaign-success';
export interface StopCheckCampaignSuccessPayload {
  campaign_id: string;
}
export class StopCheckCampaignSuccess implements Action {
  readonly type = STOP_CHECK_CAMPAIGN_SUCCESS;
  constructor(public payload: StopCheckCampaignSuccessPayload) {}
}
//#endregion

//#region Stop Check Campaign Failed
export const STOP_CHECK_CAMPAIGN_FAILED =
  '@lc/campaign/stop-check-campaign-failed';
export interface StopCheckCampaignFailedPayload {
  campaign_id: string;
}
export class StopCheckCampaignFailed implements Action {
  readonly type = STOP_CHECK_CAMPAIGN_FAILED;
  constructor(public payload: StopCheckCampaignFailedPayload) {}
}
//#endregion

//#region Delete Campaign Job
export const DELETE_CAMPAIGN_JOB = '@lc/campaign/delete-campaign-job';
export interface DeleteCampaignJobPayload {
  campaign_id: string;
}
export class DeleteCampaignJob implements Action {
  readonly type = DELETE_CAMPAIGN_JOB;
  constructor(public payload: DeleteCampaignJobPayload) {}
}
//#endregion

//#region Delete Campaign Job Success
export const DELETE_CAMPAIGN_JOB_SUCCESS =
  '@lc/campaign/delete-campaign-job-success';
export interface DeleteCampaignJobSuccessPayload {
  campaign_id: string;
}
export class DeleteCampaignJobSuccess implements Action {
  readonly type = DELETE_CAMPAIGN_JOB_SUCCESS;
  constructor(public payload: DeleteCampaignJobSuccessPayload) {}
}
//#endregion

//#region Delete Campaign Job Failed
export const DELETE_CAMPAIGN_JOB_FAILED =
  '@lc/campaign/delete-campaign-job-failed';
export interface DeleteCampaignJobFailedPayload {
  campaign_id: string;
}
export class DeleteCampaignJobFailed implements Action {
  readonly type = DELETE_CAMPAIGN_JOB_FAILED;
  constructor(public payload: DeleteCampaignJobFailedPayload) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/campaign/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/campaign/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions =
  | UpdateFilter
  | GetList
  | GetListSuccesful
  | GetListFailed
  | GetStatistics
  | GetStatisticsSuccesful
  | GetStatisticsFailed
  | UpdateItem
  | StartCampaign
  | StartCampaignSuccess
  | StartCampaignFailed
  | StopCampaign
  | StopCampaignSuccess
  | StopCampaignFailed
  | MarkCampaignStopped
  | MarkCampaignStoppedSuccess
  | MarkCampaignStoppedFailed
  | TestCampaign
  | TestCampaignSuccess
  | TestCampaignFailed
  | CheckCampaign
  | CheckCampaignSuccess
  | CheckCampaignFailed
  | StopCheckCampaign
  | StopCheckCampaignSuccess
  | StopCheckCampaignFailed
  | DeleteCampaignJob
  | DeleteCampaignJobSuccess
  | DeleteCampaignJobFailed
  | AddError
  | ClearDetail;
