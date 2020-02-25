import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DidState } from './did.states';

export const name = 'did';
export const didSelector = createFeatureSelector<DidState>(name);

export const didFetchSelector = createSelector(
  didSelector,
  (state: DidState) => state.didFetch
);

export const fetchingSelector = createSelector(
  didSelector,
  (state: DidState) => state.fetching
);

export const processingSelector = createSelector(
  didSelector,
  (state: DidState) => state.processing
);

export const dataSelector = createSelector(
  didSelector,
  (state: DidState) => state.data
);

export const filterSelector = createSelector(
  didSelector,
  (state: DidState) => state.filter
);

export const metaSelector = createSelector(
  didSelector,
  (state: DidState) => state.meta
);
