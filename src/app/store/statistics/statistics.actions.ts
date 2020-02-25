import { Action } from '@ngrx/store';

import * as commonModels from 'app/shared/models/common.model';
import * as templateGroupModels from 'app/shared/models/message-template-group.model';
import * as statisticsModels from 'app/shared/models/statistics.model';

//#region Get TLD Statistics
export const GET_TLD = '@lc/statistics/get-tld';
export interface GetTldPayload {
  filter: statisticsModels.TldFilter;
}
export class GetTld implements Action {
  readonly type = GET_TLD;
  constructor(public payload: GetTldPayload) {}
}
//#endregion

//#region Get TLD Statistics Success
export const GET_TLD_SUCCESS = '@lc/statistics/get-tld-success';

export class GetTldSuccess implements Action {
  readonly type = GET_TLD_SUCCESS;
  constructor(public payload: statisticsModels.TldResponse) {}
}
//#endregion

//#region Get TLD Statistics Failed
export const GET_TLD_FAILED = '@lc/statistics/get-tld-failed';
export interface GetTldFailedPayload {
  error: string;
}
export class GetTldFailed implements Action {
  readonly type = GET_TLD_FAILED;
  constructor(public payload: GetTldFailedPayload) {}
}
//#endregion

//#region Update TLD Filter
export const UPDATE_TLD_FILTER = '@lc/statistics/update-tld-filter';

export class UpdateTldFilter implements Action {
  readonly type = UPDATE_TLD_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Clear TLD Detail
export const CLEAR_TLD_DETAIL = '@lc/statistics/clear-tld-detail';
export class ClearTldDetail implements Action {
  readonly type = CLEAR_TLD_DETAIL;
  constructor() {}
}
//#endregion

//#region Get Template Group Statistics
export const GET_TEMPLATE_GROUP = '@lc/statistics/get-template-group';
export interface GetTemplateGroupPayload {
  filter: statisticsModels.TemplateGrouplStatisticsFilter;
}
export class GetTemplateGroup implements Action {
  readonly type = GET_TEMPLATE_GROUP;
  constructor(public payload: GetTemplateGroupPayload) {}
}
//#endregion

//#region Get Template Group Statistics Success
export const GET_TEMPLATE_GROUP_SUCCESS =
  '@lc/statistics/get-template-group-success';

export class GetTemplateGroupSuccess implements Action {
  readonly type = GET_TEMPLATE_GROUP_SUCCESS;
  constructor(public payload: statisticsModels.TemplateGroupResponse) {}
}
//#endregion

//#region Get Template Group Statistics Failed
export const GET_TEMPLATE_GROUP_FAILED =
  '@lc/statistics/get-template-group-failed';
export interface GetTemplateGroupFailedPayload {
  error: string;
}
export class GetTemplateGroupFailed implements Action {
  readonly type = GET_TEMPLATE_GROUP_FAILED;
  constructor(public payload: GetTemplateGroupFailedPayload) {}
}
//#endregion

//#region Update Template Group Filter
export const UPDATE_TEMPLATE_GROUP_FILTER =
  '@lc/statistics/update-template-group-filter';

export class UpdateTemplateGroupFilter implements Action {
  readonly type = UPDATE_TEMPLATE_GROUP_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Clear Template Group Detail
export const CLEAR_TEMPLATE_GROUP_DETAIL =
  '@lc/statistics/clear-template-group-detail';
export class ClearTemplateGroupDetail implements Action {
  readonly type = CLEAR_TEMPLATE_GROUP_DETAIL;
  constructor() {}
}
//#endregion

//#region Get Template Group List
export const GET_TEMPLATE_GROUP_LIST = '@lc/statistics/get-template-group-list';
export class GetTemplateGroupList implements Action {
  readonly type = GET_TEMPLATE_GROUP_LIST;
  constructor() {}
}
//#endregion

//#region Get Template Group List Success
export const GET_TEMPLATE_GROUP_LIST_SUCCESS =
  '@lc/statistics/get-template-group-list-success';

export class GetTemplateGroupListSuccess implements Action {
  readonly type = GET_TEMPLATE_GROUP_LIST_SUCCESS;
  constructor(
    public payload: templateGroupModels.MessageTemplateGroupResponse
  ) {}
}
//#endregion

//#region Get Template Group List Failed
export const GET_TEMPLATE_GROUP_LIST_FAILED =
  '@lc/statistics/get-template-group-list-failed';
export interface GetTemplateGroupListFailedPayload {
  error: string;
}
export class GetTemplateGroupListFailed implements Action {
  readonly type = GET_TEMPLATE_GROUP_LIST_FAILED;
  constructor(public payload: GetTemplateGroupListFailedPayload) {}
}
//#endregion

//#region Update Template Group List Filter
export const UPDATE_TEMPLATE_GROUP_LIST_FILTER =
  '@lc/statistics/update-template-group-list-filter';

export class UpdateTemplateGroupListFilter implements Action {
  readonly type = UPDATE_TEMPLATE_GROUP_LIST_FILTER;
  constructor(public payload: object) {}
}
//#endregion

//#region Update Template Group List Meta
export const UPDATE_TEMPLATE_GROUP_LIST_META =
  '@lc/statistics/update-template-group-list-group-meta';

export class UpdateTemplateGroupListMeta implements Action {
  readonly type = UPDATE_TEMPLATE_GROUP_LIST_META;
  constructor(public payload: object) {}
}
//#endregion

//#region Clear Template Group List
export const CLEAR_TEMPLATE_GROUP_LIST =
  '@lc/statistics/clear-template-group-list';
export class ClearTemplateGroupList implements Action {
  readonly type = CLEAR_TEMPLATE_GROUP_LIST;
  constructor() {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/statistics/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions =
  | GetTld
  | GetTldSuccess
  | GetTldFailed
  | UpdateTldFilter
  | ClearTldDetail
  | GetTemplateGroup
  | GetTemplateGroupSuccess
  | GetTemplateGroupFailed
  | UpdateTemplateGroupFilter
  | ClearTemplateGroupDetail
  | GetTemplateGroupList
  | GetTemplateGroupListSuccess
  | GetTemplateGroupListFailed
  | UpdateTemplateGroupListFilter
  | UpdateTemplateGroupListMeta
  | ClearTemplateGroupList
  | ClearDetail;
