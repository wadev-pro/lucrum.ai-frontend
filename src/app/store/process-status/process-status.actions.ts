import { Action } from '@ngrx/store';

import * as campaignModels from 'app/shared/models/campaign.model';

//#region Get List
export const GET_LIST = '@lc/process-status/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor() {}
}
//#endregion

//#region Get List Successful
export const GET_LIST_SUCCESSFUL = '@lc/process-status/get-list-successful';

export class GetListSuccesful implements Action {
  readonly type = GET_LIST_SUCCESSFUL;
  constructor(public payload: Array<campaignModels.ProcessStatus>) {}
}
//#endregion

//#region Get List Failed
export const GET_LIST_FAILED = '@lc/process-status/get-list-failed';
export interface GetListFailedPayload {
  error: string;
}
export class GetListFailed implements Action {
  readonly type = GET_LIST_FAILED;
  constructor(public payload: GetListFailedPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/process-status/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions = GetList | GetListSuccesful | GetListFailed | ClearDetail;
