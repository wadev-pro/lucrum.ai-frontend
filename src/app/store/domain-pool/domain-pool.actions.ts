import { Action } from '@ngrx/store';

import * as commonModels from 'app/shared/models/common.model';
import * as domainModels from 'app/shared/models/domain-pool.models';

//#region Get Domains
export const GET_LIST = '@lc/domain-pool/get-list';
export interface GetListPayload {
  campaign_id: string;
}
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor(public payload: GetListPayload) {}
}
//#endregion

//#region Get Domains Success
export const GET_LIST_SUCCESS = '@lc/domain-pool/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor(public payload: Array<domainModels.DomainPool>) {}
}
//#endregion

//#region Add New Domains
export const ADD_DOMAIN = '@lc/domain-pool/add-domain';
export interface AddDomainPayload {
  campaign_id: string;
  domain: Array<domainModels.DomainPool>;
}
export class AddDomain implements Action {
  readonly type = ADD_DOMAIN;
  constructor(public payload: AddDomainPayload) {}
}
//#endregion

//#region Add New Domains Success
export const ADD_DOMAIN_SUCCESS = '@lc/domain-pool/add-domain-success';

export class AddDomainSuccess implements Action {
  readonly type = ADD_DOMAIN_SUCCESS;
  constructor() {}
}
//#endregion

//#region Edit Domains
export const EDIT_DOMAIN = '@lc/domain-pool/edit-domain';
export interface EditDomainPayload {
  campaign_id: string;
  index: number;
  domain: domainModels.DomainPool;
}
export class EditDomain implements Action {
  readonly type = EDIT_DOMAIN;
  constructor(public payload: EditDomainPayload) {}
}
//#endregion

//#region Edit Domains Success
export const EDIT_DOMAIN_SUCCESS = '@lc/domain-pool/edit-domain-success';
export interface EditDomainSuccessPayload {
  index: number;
  domain: domainModels.DomainPool;
}
export class EditDomainSuccess implements Action {
  readonly type = EDIT_DOMAIN_SUCCESS;
  constructor(public payload: EditDomainSuccessPayload) {}
}
//#endregion

//#region Delete Domains
export const DELETE_DOMAIN = '@lc/domain-pool/delete-domain';
export interface DeleteDomainPayload {
  campaign_id: string;
  id: number;
}
export class DeleteDomain implements Action {
  readonly type = DELETE_DOMAIN;
  constructor(public payload: DeleteDomainPayload) {}
}
//#endregion

//#region Delete All Domains Success
export const DELETE_DOMAIN_SUCCESS = '@lc/domain-pool/delete-domain-success';

export class DeleteDomainSuccess implements Action {
  readonly type = DELETE_DOMAIN_SUCCESS;
  constructor() {}
}
//#endregion

//#region Delete All Domains Failed
export const ADD_ERROR = '@lc/domain-pool/add-error';
export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/domain-pool/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Update Meta
export const UPDATE_META = '@lc/domain-pool/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor(public payload: object) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/domain-pool/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions =
  | GetList
  | GetListSuccess
  | AddDomain
  | AddDomainSuccess
  | EditDomain
  | EditDomainSuccess
  | DeleteDomain
  | DeleteDomainSuccess
  | AddError
  | UpdateFilter
  | UpdateMeta
  | ClearDetail;
