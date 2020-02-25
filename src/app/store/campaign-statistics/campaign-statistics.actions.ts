import { Action } from '@ngrx/store';

import * as campaignStatisticsModels from 'app/shared/models/campaign-statistics.models';
import * as commonModels from 'app/shared/models/common.model';

//#region Get Message Count
export const GET_MESSAGE_COUNT = '@lc/campaign-statistics/get-message-count';
export interface GetMessageCountPayload {
  campaign_id: string;
}
export class GetMessageCount implements Action {
  readonly type = GET_MESSAGE_COUNT;
  constructor(public payload: GetMessageCountPayload) {}
}
//#endregion

//#region Get Message Count Success
export const GET_MESSAGE_COUNT_SUCCESS =
  '@lc/campaign-statistics/get-message-count-success';

export class GetMessageCountSuccess implements Action {
  readonly type = GET_MESSAGE_COUNT_SUCCESS;
  constructor(public payload: campaignStatisticsModels.MessageCount) {}
}
//#endregion

//#region Get Message Count Failed
export const GET_MESSAGE_COUNT_FAILED =
  '@lc/campaign-statistics/get-message-count-failed';
export interface GetMessageCountFailedPayload {
  error: string;
}
export class GetMessageCountFailed implements Action {
  readonly type = GET_MESSAGE_COUNT_FAILED;
  constructor(public payload: GetMessageCountFailedPayload) {}
}
//#endregion

//#region Get Carrier Statistics
export const GET_CARRIER = '@lc/campaign-statistics/get-carrier';
export interface GetCarrierPayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetCarrier implements Action {
  readonly type = GET_CARRIER;
  constructor(public payload: GetCarrierPayload) {}
}
//#endregion

//#region Get Carrier Statistics Success
export const GET_CARRIER_SUCCESS =
  '@lc/campaign-statistics/get-carrier-success';

export class GetCarrierSuccess implements Action {
  readonly type = GET_CARRIER_SUCCESS;
  constructor(public payload: campaignStatisticsModels.CarrierResponse) {}
}
//#endregion

//#region Get Carrier Statistics Failed
export const GET_CARRIER_FAILED = '@lc/campaign-statistics/get-carrier-failed';
export interface GetCarrierFailedPayload {
  error: string;
}
export class GetCarrierFailed implements Action {
  readonly type = GET_CARRIER_FAILED;
  constructor(public payload: GetCarrierFailedPayload) {}
}
//#endregion

//#region Update Filter
export const UPDATE_CARRIER_FILTER =
  '@lc/campaign-statistics/update-carrier-filter';

export class UpdateCarrierFilter implements Action {
  readonly type = UPDATE_CARRIER_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Get Did Statistics
export const GET_DID = '@lc/campaign-statistics/get-did';
export interface GetDidPayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetDid implements Action {
  readonly type = GET_DID;
  constructor(public payload: GetDidPayload) {}
}
//#endregion

//#region Get Did Statistics Success
export const GET_DID_SUCCESS = '@lc/campaign-statistics/get-did-success';

export class GetDidSuccess implements Action {
  readonly type = GET_DID_SUCCESS;
  constructor(public payload: campaignStatisticsModels.DidResponse) {}
}
//#endregion

//#region Get Did Statistics Failed
export const GET_DID_FAILED = '@lc/campaign-statistics/get-did-failed';
export interface GetDidFailedPayload {
  error: string;
}
export class GetDidFailed implements Action {
  readonly type = GET_DID_FAILED;
  constructor(public payload: GetDidFailedPayload) {}
}
//#endregion

//#region Update Did Filter
export const UPDATE_DID_FILTER = '@lc/campaign-statistics/update-did-filter';

export class UpdateDidFilter implements Action {
  readonly type = UPDATE_DID_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Get Message Template Statistics
export const GET_MESSAGE_TEMPLATE =
  '@lc/campaign-statistics/get-message-template';
export interface GetMessageTemplatePayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetMessageTemplate implements Action {
  readonly type = GET_MESSAGE_TEMPLATE;
  constructor(public payload: GetMessageTemplatePayload) {}
}
//#endregion

//#region Get Message Template Statistics Success
export const GET_MESSAGE_TEMPLATE_SUCCESS =
  '@lc/campaign-statistics/get-message-template-success';

export class GetMessageTemplateSuccess implements Action {
  readonly type = GET_MESSAGE_TEMPLATE_SUCCESS;
  constructor(
    public payload: campaignStatisticsModels.MessageTemplateResponse
  ) {}
}
//#endregion

//#region Get Message Template Statistics Failed
export const GET_MESSAGE_TEMPLATE_FAILED =
  '@lc/campaign-statistics/get-message-template-failed';
export interface GetMessageTemplateFailedPayload {
  error: string;
}
export class GetMessageTemplateFailed implements Action {
  readonly type = GET_MESSAGE_TEMPLATE_FAILED;
  constructor(public payload: GetMessageTemplateFailedPayload) {}
}
//#endregion

//#region Update Messgae Template Filter
export const UPDATE_MESSAGE_TEMPLATE_FILTER =
  '@lc/campaign-statistics/update-message-template-filter';

export class UpdateMessageTemplateFilter implements Action {
  readonly type = UPDATE_MESSAGE_TEMPLATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Get TLD Statistics
export const GET_TLD = '@lc/campaign-statistics/get-tld';
export interface GetTldPayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetTld implements Action {
  readonly type = GET_TLD;
  constructor(public payload: GetTldPayload) {}
}
//#endregion

//#region Get TLD Statistics Success
export const GET_TLD_SUCCESS = '@lc/campaign-statistics/get-tld-success';

export class GetTldSuccess implements Action {
  readonly type = GET_TLD_SUCCESS;
  constructor(public payload: campaignStatisticsModels.TldResponse) {}
}
//#endregion

//#region Get TLD Statistics Failed
export const GET_TLD_FAILED = '@lc/campaign-statistics/get-tld-failed';
export interface GetTldFailedPayload {
  error: string;
}
export class GetTldFailed implements Action {
  readonly type = GET_TLD_FAILED;
  constructor(public payload: GetTldFailedPayload) {}
}
//#endregion

//#region Update Messgae Template Filter
export const UPDATE_TLD_FILTER = '@lc/campaign-statistics/update-tld-filter';

export class UpdateTldFilter implements Action {
  readonly type = UPDATE_TLD_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Message Sent Statistics
export const GET_MESSAGE_SENT = '@lc/campaign-statistics/get-message-sent';
export interface GetMessageSentPayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetMessageSent implements Action {
  readonly type = GET_MESSAGE_SENT;
  constructor(public payload: GetMessageSentPayload) {}
}

export const GET_MESSAGE_SENT_SUCCESS =
  '@lc/campaign-statistics/get-message-sent-success';
export class GetMessageSentSuccess implements Action {
  readonly type = GET_MESSAGE_SENT_SUCCESS;
  constructor(public payload: campaignStatisticsModels.MessageSentResponse) {}
}

export const GET_MESSAGE_SENT_FAILED =
  '@lc/campaign-statistics/get-message-sent-failed';
export interface GetMessageSentFailedPayload {
  error: string;
}
export class GetMessageSentFailed implements Action {
  readonly type = GET_MESSAGE_SENT_FAILED;
  constructor(public payload: GetMessageSentFailedPayload) {}
}

export const UPDATE_MESSAGE_SENT_FILTER =
  '@lc/campaign-statistics/update-message-sent-filter';

export class UpdateMessageSentFilter implements Action {
  readonly type = UPDATE_MESSAGE_SENT_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Click Statistics
export const GET_CLICK = '@lc/campaign-statistics/get-click';
export interface GetClickPayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetClick implements Action {
  readonly type = GET_CLICK;
  constructor(public payload: GetClickPayload) {}
}

export const GET_CLICK_SUCCESS = '@lc/campaign-statistics/get-click-success';
export class GetClickSuccess implements Action {
  readonly type = GET_CLICK_SUCCESS;
  constructor(public payload: campaignStatisticsModels.ClickResponse) {}
}

export const GET_CLICK_FAILED = '@lc/campaign-statistics/get-click-failed';
export interface GetClickFailedPayload {
  error: string;
}
export class GetClickFailed implements Action {
  readonly type = GET_CLICK_FAILED;
  constructor(public payload: GetClickFailedPayload) {}
}

export const UPDATE_CLICK_FILTER =
  '@lc/campaign-statistics/update-click-filter';

export class UpdateClickFilter implements Action {
  readonly type = UPDATE_CLICK_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Conversion Statistics
export const GET_CONVERSION = '@lc/campaign-statistics/get-conversion';
export interface GetConversionPayload {
  campaign_id: string;
  filter: commonModels.Filter;
}
export class GetConversion implements Action {
  readonly type = GET_CONVERSION;
  constructor(public payload: GetConversionPayload) {}
}

export const GET_CONVERSION_SUCCESS =
  '@lc/campaign-statistics/get-conversion-success';
export class GetConversionSuccess implements Action {
  readonly type = GET_CONVERSION_SUCCESS;
  constructor(public payload: campaignStatisticsModels.ConversionResponse) {}
}

export const GET_CONVERSION_FAILED =
  '@lc/campaign-statistics/get-conversion-failed';
export interface GetConversionFailedPayload {
  error: string;
}
export class GetConversionFailed implements Action {
  readonly type = GET_CONVERSION_FAILED;
  constructor(public payload: GetConversionFailedPayload) {}
}

export const UPDATE_CONVERSION_FILTER =
  '@lc/campaign-statistics/update-conversion-filter';

export class UpdateConversionFilter implements Action {
  readonly type = UPDATE_CONVERSION_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/campaign-statistics/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/campaign-statistics/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

export type Actions =
  | ClearDetail
  | GetMessageCount
  | GetMessageCountSuccess
  | GetMessageCountFailed
  | GetCarrier
  | GetCarrierSuccess
  | GetCarrierFailed
  | UpdateCarrierFilter
  | GetDid
  | GetDidSuccess
  | GetDidFailed
  | UpdateDidFilter
  | GetMessageTemplate
  | GetMessageTemplateSuccess
  | GetMessageTemplateFailed
  | UpdateMessageTemplateFilter
  | GetTld
  | GetTldSuccess
  | GetTldFailed
  | UpdateTldFilter
  | GetMessageSent
  | GetMessageSentSuccess
  | GetMessageSentFailed
  | UpdateMessageSentFilter
  | GetClick
  | GetClickSuccess
  | GetClickFailed
  | UpdateClickFilter
  | GetConversion
  | GetConversionSuccess
  | GetConversionFailed
  | UpdateConversionFilter
  | AddError;
