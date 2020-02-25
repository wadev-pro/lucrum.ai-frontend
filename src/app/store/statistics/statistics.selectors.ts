import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatisticsState } from './statistics.states';

export const name = 'statistics';
export const statisticsSelector = createFeatureSelector<StatisticsState>(name);
/* TLD Selector */
export const tldDidFetchSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.tldDidFetch
);

export const tldFetchingSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.tldFetching
);

export const tldDataSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.tldData
);

export const tldFilterSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.tldFilter
);

export const tldMetaSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.tldMeta
);

/* Template Group Selector */
export const templateGroupDidFetchSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupDidFetch
);

export const templateGroupFetchingSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupFetching
);

export const templateGroupDataSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupData
);

export const templateGroupFilterSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupFilter
);

export const templateGroupMetaSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupMeta
);

/* Template Group List Selector */
export const templateGroupListDidFetchSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupListDidFetch
);

export const templateGroupListFetchingSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupListFetching
);

export const templateGroupListDataSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupListData
);

export const templateGroupListFilterSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupListFilter
);

export const templateGroupListMetaSelector = createSelector(
  statisticsSelector,
  (state: StatisticsState) => state.templateGroupListMeta
);
