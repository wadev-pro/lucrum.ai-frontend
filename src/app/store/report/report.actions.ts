import { Action } from '@ngrx/store';

import * as reportModels from 'app/shared/models/reports.model';

//#region Get LEAD Report
export const GET_LEAD = '@lc/reports/get-lead';
export interface GetLeadPayload {
  filter: reportModels.Filter;
}
export class GetLead implements Action {
  readonly type = GET_LEAD;
  constructor(public payload: GetLeadPayload) {}
}
//#endregion

//#region Get LEAD Report Success
export const GET_LEAD_SUCCESS = '@lc/reports/get-lead-success';

export class GetLeadSuccess implements Action {
  readonly type = GET_LEAD_SUCCESS;
  constructor(public payload: reportModels.LeadResponse) {}
}
//#endregion

//#region Get LEAD Report Failed
export const GET_LEAD_FAILED = '@lc/reports/get-lead-failed';
export interface GetLeadFailedPayload {
  error: string;
}
export class GetLeadFailed implements Action {
  readonly type = GET_LEAD_FAILED;
  constructor(public payload: GetLeadFailedPayload) {}
}
//#endregion

//#region Update LEAD Report Filter
export const UPDATE_LEAD_FILTER = '@lc/reports/update-lead-filter';

export class UpdateLeadFilter implements Action {
  readonly type = UPDATE_LEAD_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Clear LEAD Report Detail
export const CLEAR_LEAD_DETAIL = '@lc/reports/clear-lead-detail';
export class ClearLeadDetail implements Action {
  readonly type = CLEAR_LEAD_DETAIL;
  constructor() {}
}
//#endregion

export type Actions =
  | GetLead
  | GetLeadSuccess
  | GetLeadFailed
  | UpdateLeadFilter
  | ClearLeadDetail;
