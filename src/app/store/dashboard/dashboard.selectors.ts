import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.states';

export const name = 'dashboard';
export const dashboardSelector = createFeatureSelector<DashboardState>(name);

export const didFetchSelector = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.didFetch
);

export const fetchingSelector = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.fetching
);

export const statisticsSelector = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.data
);

export const statisticsFilter = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.filter
);
