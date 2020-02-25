import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessStatusState } from './process-status.states';

export const name = 'processStatus';
export const processStatusSelector = createFeatureSelector<ProcessStatusState>(
  name
);

export const didFetchSelector = createSelector(
  processStatusSelector,
  (state: ProcessStatusState) => state.didFetch
);

export const fetchingSelector = createSelector(
  processStatusSelector,
  (state: ProcessStatusState) => state.fetching
);

export const dataSelector = createSelector(
  processStatusSelector,
  (state: ProcessStatusState) => state.data
);
