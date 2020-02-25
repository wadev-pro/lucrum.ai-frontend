import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DidPoolState } from './did-pool.states';

export const name = 'didPool';
export const didPoolSelector = createFeatureSelector<DidPoolState>(name);

export const didFetchSelector = createSelector(
  didPoolSelector,
  (state: DidPoolState) => state.didFetch
);

export const fetchingSelector = createSelector(
  didPoolSelector,
  (state: DidPoolState) => state.fetching
);

export const processingSelector = createSelector(
  didPoolSelector,
  (state: DidPoolState) => state.processing
);

export const dataSelector = createSelector(
  didPoolSelector,
  (state: DidPoolState) => state.data
);

export const filterSelector = createSelector(
  didPoolSelector,
  (state: DidPoolState) => state.filter
);

export const metaSelector = createSelector(
  didPoolSelector,
  (state: DidPoolState) => state.meta
);
