import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SeedNumberState } from './seed-number.states';

export const name = 'seedNumber';
export const seedNumberSelector = createFeatureSelector<SeedNumberState>(name);

export const didFetchSelector = createSelector(
  seedNumberSelector,
  (state: SeedNumberState) => state.didFetch
);

export const fetchingSelector = createSelector(
  seedNumberSelector,
  (state: SeedNumberState) => state.fetching
);

export const processingSelector = createSelector(
  seedNumberSelector,
  (state: SeedNumberState) => state.processing
);

export const dataSelector = createSelector(
  seedNumberSelector,
  (state: SeedNumberState) => state.data
);

export const filterSelector = createSelector(
  seedNumberSelector,
  (state: SeedNumberState) => state.filter
);

export const metaSelector = createSelector(
  seedNumberSelector,
  (state: SeedNumberState) => state.meta
);
