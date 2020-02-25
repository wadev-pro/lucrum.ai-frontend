import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportStatusState } from './report-status.states';

export const name = 'reportStatus';
export const reportStatusSelector = createFeatureSelector<ReportStatusState>(
  name
);

export const didFetchSelector = createSelector(
  reportStatusSelector,
  (state: ReportStatusState) => state.didFetch
);

export const fetchingSelector = createSelector(
  reportStatusSelector,
  (state: ReportStatusState) => state.fetching
);

export const processingSelector = createSelector(
  reportStatusSelector,
  (state: ReportStatusState) => state.processing
);

export const dataSelector = createSelector(
  reportStatusSelector,
  (state: ReportStatusState) => state.data
);

export const filterSelector = createSelector(
  reportStatusSelector,
  (state: ReportStatusState) => state.filter
);

export const metaSelector = createSelector(
  reportStatusSelector,
  (state: ReportStatusState) => state.meta
);
