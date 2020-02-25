import { Action } from '@ngrx/store';

import * as dashboardModels from 'app/shared/models/dashboard.model';

//#region Update Filter
export const UPDATE_FILTER = '@lc/dashboard/update-filter';
export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor(public payload: dashboardModels.DashboardFilter) {}
}
//#endregion

//#region Get Statistics
export const GET_STATISTICS = '@lc/dashboard/get-statistics';
export class GetStatistics implements Action {
  readonly type = GET_STATISTICS;
  constructor(public payload: dashboardModels.DashboardFilter) {}
}
//#endregion

//#region Get Statistics Successful
export const GET_STATISTICS_SUCCESSFUL =
  '@lc/dashboard/get-statistics-successful';

export class GetStatisticsSuccesful implements Action {
  readonly type = GET_STATISTICS_SUCCESSFUL;
  constructor(public payload: dashboardModels.Statistics) {}
}
//#endregion

//#region Get Statistics Failed
export const GET_STATISTICS_FAILED = '@lc/dashboard/get-statistics-failed';
export interface GetStatisticsFailedPayload {
  error: string;
}
export class GetStatisticsFailed implements Action {
  readonly type = GET_STATISTICS_FAILED;
  constructor(public payload: GetStatisticsFailedPayload) {}
}
//#endregion

//#region Clear Detail
export const CLEAR_DETAIL = '@lc/dashboard/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor() {}
}
//#endregion

export type Actions =
  | UpdateFilter
  | GetStatistics
  | GetStatisticsSuccesful
  | GetStatisticsFailed
  | ClearDetail;
