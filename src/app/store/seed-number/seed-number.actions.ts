import { Action } from '@ngrx/store';

import * as commonModels from 'app/shared/models/common.model';
import { SeedNumber } from 'app/shared/models/seed-number.model';

//#region Get List
export const GET_LIST = '@lc/seed-number/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor() {}
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/seed-number/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor(public payload: Array<SeedNumber>) {}
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/seed-number/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Update Meta
export const UPDATE_META = '@lc/seed-number/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor(public payload: object) {}
}
//#endregion

//#region Create
export const CREATE = '@lc/seed-number/create';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: SeedNumber) {}
}

export const CREATE_SUCCESS = '@lc/seed-number/create-success';

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: SeedNumber) {}
}
//#endregion

//#region Delete
export const DELETE = '@lc/seed-number/delete';
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: string) {}
}

export const DELETE_SUCCESS = '@lc/seed-number/delete-success';
export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: string) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/seed-number/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/seed-number/clear-detail';
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
  | Create
  | CreateSuccess
  | Delete
  | DeleteSuccess
  | AddError
  | ClearDetail;
