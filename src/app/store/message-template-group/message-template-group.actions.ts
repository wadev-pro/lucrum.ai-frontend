import { Action } from '@ngrx/store';

import * as commonModels from 'app/shared/models/common.model';
import * as templateGroupModels from 'app/shared/models/message-template-group.model';

//#region Get List
export const GET_LIST = '@lc/template-group/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor() {}
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/template-group/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor(
    public payload: templateGroupModels.MessageTemplateGroupResponse
  ) {}
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/template-group/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Update Meta
export const UPDATE_META = '@lc/template-group/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor(public payload: object) {}
}
//#endregion

//#region Create
export const CREATE = '@lc/template-group/create';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: templateGroupModels.MessageTemplateGroup) {}
}

export const CREATE_SUCCESS = '@lc/template-group/create-success';

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: templateGroupModels.MessageTemplateGroup) {}
}
//#endregion

//#region Update
export const UPDATE = '@lc/template-group/update';

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: templateGroupModels.MessageTemplateGroup) {}
}

export const UPDATE_SUCCESS = '@lc/template-group/update-success';

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: templateGroupModels.MessageTemplateGroup) {}
}
//#endregion

//#region Delete
export const DELETE = '@lc/template-group/delete';
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: templateGroupModels.MessageTemplateGroup) {}
}

export const DELETE_SUCCESS = '@lc/template-group/delete-success';
export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: templateGroupModels.MessageTemplateGroup) {}
}
//#endregion

//#region Add Error
export const ADD_ERROR = '@lc/template-group/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/template-group/clear-detail';
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
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess
  | AddError
  | ClearDetail;
