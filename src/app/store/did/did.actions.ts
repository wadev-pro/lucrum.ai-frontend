import { Action } from '@ngrx/store';

import * as commonModels from 'app/shared/models/common.model';
import * as didModels from 'app/shared/models/dids.model';

//#region Get List
export const GET_LIST = '@lc/did/get-list';
export interface GetListPayload {
  did_pool_id: string;
  filter: commonModels.Filter;
}
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor(public payload: GetListPayload) {}
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/did/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor(public payload: didModels.DidResponse) {}
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/did/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Update Meta
export const UPDATE_META = '@lc/did/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor(public payload: object) {}
}
//#endregion

//#region Delete
export const DELETE = '@lc/did/delete';
export interface DeletePayload {
  id: string;
}
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: DeletePayload) {}
}

export const DELETE_SUCCESS = '@lc/did/delete-success';
export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor() {}
}
//#endregion

//#region Activate
export const ACTIVATE = '@lc/did/activate';
export interface ActivatePayload {
  id: string;
}
export class Activate implements Action {
  readonly type = ACTIVATE;
  constructor(public payload: ActivatePayload) {}
}

export const ACTIVATE_SUCCESS = '@lc/did/activate-success';
export class ActivateSuccess implements Action {
  readonly type = ACTIVATE_SUCCESS;
  constructor(public payload: didModels.Did) {}
}
//#endregion

//#region Deactivate
export const DEACTIVATE = '@lc/did/deactivate';
export interface DeactivatePayload {
  id: string;
}
export class Deactivate implements Action {
  readonly type = DEACTIVATE;
  constructor(public payload: DeactivatePayload) {}
}

export const DEACTIVATE_SUCCESS = '@lc/did/deactivate-success';
export class DeactivateSuccess implements Action {
  readonly type = DEACTIVATE_SUCCESS;
  constructor(public payload: didModels.Did) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/did/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/did/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions =
  | GetList
  | GetListSuccess
  | UpdateFilter
  | UpdateMeta
  | Delete
  | DeleteSuccess
  | Deactivate
  | DeactivateSuccess
  | Activate
  | ActivateSuccess
  | AddError
  | ClearDetail;
