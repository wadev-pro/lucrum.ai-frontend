import { Action } from '@ngrx/store';
import * as campaignModels from 'app/shared/models/campaign.model';

//#region Update Campaign Detail
export const UPDATE_DETAIL = '@lc/campaign-detail/update-detail';
export class UpdateDetail implements Action {
  readonly type = UPDATE_DETAIL;
  constructor(public payload: Object) {}
}
//#endregion

//#region Update Campaing Id
export const UPDATE_CAMPAIGN_ID = '@lc/campaign-detail/update-campaign-id';
export class UpdateCampaignId implements Action {
  readonly type = UPDATE_CAMPAIGN_ID;
  constructor(public payload: string) {}
}
//#endregion

//#region Get Campaign Detail
export const GET_DETAIL = '@lc/campaign-detail/get-detail';
export interface GetDetailPayload {
  campaign_id: string;
}
export class GetDetail implements Action {
  readonly type = GET_DETAIL;
  constructor(public payload: GetDetailPayload) {}
}
//#endregion

//#region Get Campaign Detail
export const GET_DETAIL_DB = '@lc/campaign-detail/get-detail-db';
export interface GetDetailDbPayload {
  campaign_id: string;
}
export class GetDetailDb implements Action {
  readonly type = GET_DETAIL_DB;
  constructor(public payload: GetDetailDbPayload) {}
}
//#endregion

//#region Get Campaign Detail Successful
export const GET_DETAIL_SUCCESSFUL =
  '@lc/campaign-detail/get-detail-successful';
export class GetDetailSuccesful implements Action {
  readonly type = GET_DETAIL_SUCCESSFUL;
  constructor(public payload: campaignModels.CampaignDetail) {}
}
//#endregion

//#region Get Campaign Detail Failed
export const GET_DETAIL_FAILED = '@lc/campaign-detail/get-detail-failed';
export interface GetDetailFailedPayload {
  error: string;
}
export class GetDetailFailed implements Action {
  readonly type = GET_DETAIL_FAILED;
  constructor(public payload: GetDetailFailedPayload) {}
}
//#endregion

//#region Clear Campaign Detail
export const CLEAR_DETAIL = '@lc/campaign-detail/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

//#region Get DID pool data
export const GET_DID_POOL = '@lc/campaign-detail/get-did-pool';
export interface GetDidPoolPayload {
  id: string;
}
export class GetDidPool implements Action {
  readonly type = GET_DID_POOL;
  constructor(public payload: GetDidPoolPayload) {}
}
//#endregion

//#region Get Message Template Group data
export const GET_MESSAGE_TEMPLATE_GROUP =
  '@lc/campaign-detail/get-message-template-group';
export interface GetMessageTemplateGroupPayload {
  id: string;
}
export class GetMessageTemplateGroup implements Action {
  readonly type = GET_MESSAGE_TEMPLATE_GROUP;
  constructor(public payload: GetMessageTemplateGroupPayload) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/campaign-detail/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

export type Actions =
  | GetDetail
  | GetDetailDb
  | GetDetailSuccesful
  | GetDetailFailed
  | ClearDetail
  | UpdateDetail
  | UpdateCampaignId
  | GetDidPool
  | GetMessageTemplateGroup
  | AddError;
