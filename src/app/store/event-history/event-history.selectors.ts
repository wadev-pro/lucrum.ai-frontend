import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventHistoryState } from './event-history.states';

export const name = 'eventHistory';
export const eventHistoryPoolSelector = createFeatureSelector<
  EventHistoryState
>(name);

export const didFetchSelector = createSelector(
  eventHistoryPoolSelector,
  (state: EventHistoryState) => state.didFetch
);

export const fetchingSelector = createSelector(
  eventHistoryPoolSelector,
  (state: EventHistoryState) => state.fetching
);

export const dataSelector = createSelector(
  eventHistoryPoolSelector,
  (state: EventHistoryState) => state.data
);
