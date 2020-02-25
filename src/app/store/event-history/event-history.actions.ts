import { Action } from '@ngrx/store';

import { EventHistory } from 'app/shared/models/event-history.model';

//#region Get List
export const GET_LIST = '@lc/event-history/get-list';
export interface GetListPayload {
  campaign_id: string;
}
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor(public payload: GetListPayload) {}
}
//#endregion

//#region Get List Successful
export const GET_LIST_SUCCESSFUL = '@lc/event-history/get-list-successful';
export class GetListSuccesful implements Action {
  readonly type = GET_LIST_SUCCESSFUL;
  constructor(public payload: Array<EventHistory>) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/event-history/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/event-history/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions = GetList | GetListSuccesful | AddError | ClearDetail;
