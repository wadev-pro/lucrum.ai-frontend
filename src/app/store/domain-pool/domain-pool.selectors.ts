import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DomainPoolState } from './domain-pool.states';

export const name = 'domainPool';
export const domainPoolSelector = createFeatureSelector<DomainPoolState>(name);

export const didFetchSelector = createSelector(
  domainPoolSelector,
  (state: DomainPoolState) => state.didFetch
);

export const fetchingSelector = createSelector(
  domainPoolSelector,
  (state: DomainPoolState) => state.fetching
);

export const processingSelector = createSelector(
  domainPoolSelector,
  (state: DomainPoolState) => state.processing
);

export const dataSelector = createSelector(
  domainPoolSelector,
  (state: DomainPoolState) => state.data
);

export const filterSelector = createSelector(
  domainPoolSelector,
  (state: DomainPoolState) => state.filter
);

export const metaSelector = createSelector(
  domainPoolSelector,
  (state: DomainPoolState) => state.meta
);
