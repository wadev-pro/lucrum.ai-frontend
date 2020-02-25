import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState } from './card.states';

export const name = 'card';
export const cardSelector = createFeatureSelector<CardState>(name);

export const didFetchSelector = createSelector(
  cardSelector,
  (state: CardState) => state.didFetch,
);

export const fetchingSelector = createSelector(
  cardSelector,
  (state: CardState) => state.fetching,
);

export const processingSelector = createSelector(
  cardSelector,
  (state: CardState) => state.processing,
);

export const dataSelector = createSelector(
  cardSelector,
  (state: CardState) => state.data,
);
