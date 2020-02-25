import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportsState } from './report.states';

export const name = 'reports';
export const reportsSelector = createFeatureSelector<ReportsState>(name);
/* LEAD Selector */
export const leadDidFetchSelector = createSelector(
  reportsSelector,
  (state: ReportsState) => state.leadDidFetch
);

export const leadFetchingSelector = createSelector(
  reportsSelector,
  (state: ReportsState) => state.leadFetching
);

export const leadDataSelector = createSelector(
  reportsSelector,
  (state: ReportsState) => state.leadData
);

export const leadFilterSelector = createSelector(
  reportsSelector,
  (state: ReportsState) => state.leadFilter
);

export const leadMetaSelector = createSelector(
  reportsSelector,
  (state: ReportsState) => state.leadMeta
);
