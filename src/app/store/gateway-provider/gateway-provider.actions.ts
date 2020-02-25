import { Action } from '@ngrx/store';

import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';

//#region Get List
export const GET_LIST = '@lc/gateway-provider/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor() {}
}
//#endregion

//#region Get List Successful
export const GET_LIST_SUCCESSFUL = '@lc/gateway-provider/get-list-successful';

export class GetListSuccesful implements Action {
  readonly type = GET_LIST_SUCCESSFUL;
  constructor(public payload: Array<MessageGatewayProvider>) {}
}
//#endregion

//#region Get List Failed
export const GET_LIST_FAILED = '@lc/gateway-provider/get-list-failed';
export interface GetListFailedPayload {
  error: string;
}
export class GetListFailed implements Action {
  readonly type = GET_LIST_FAILED;
  constructor(public payload: GetListFailedPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/gateway-provider/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions = GetList | GetListSuccesful | GetListFailed | ClearDetail;
