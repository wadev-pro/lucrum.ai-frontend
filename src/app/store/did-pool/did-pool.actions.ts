import { Action } from '@ngrx/store';

import * as commonModels from 'app/shared/models/common.model';
import * as didPoolModels from 'app/shared/models/did-pool.model';

//#region Get List
export const GET_LIST = '@lc/did-pool/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor() {}
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/did-pool/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor(public payload: didPoolModels.DidPoolResponse) {}
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/did-pool/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Update Meta
export const UPDATE_META = '@lc/did-pool/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor(public payload: object) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/did-pool/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Create
export const CREATE = '@lc/did-pool/create';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: didPoolModels.DidPoolRequest) {}
}

export const CREATE_SUCCESS = '@lc/did-pool/create-success';

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: didPoolModels.DidPool) {}
}
//#endregion

//#region Update
export const UPDATE = '@lc/did-pool/update';

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: didPoolModels.DidPoolRequest) {}
}

export const UPDATE_SUCCESS = '@lc/did-pool/update-success';

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: didPoolModels.DidPoolRequest) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/did-pool/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

//#region Delete Create Success
export const DELETE_CREATE_SUCCESS = '@lc/did-pool/delete-create-success';
export class DeleteCreateSuccess implements Action {
  readonly type = DELETE_CREATE_SUCCESS;
  constructor() {}
}
//#endregion

export type Actions =
  | GetList
  | GetListSuccess
  | UpdateFilter
  | UpdateMeta
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | AddError
  | ClearDetail
  | DeleteCreateSuccess;
