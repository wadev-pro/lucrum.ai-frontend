import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampaignState } from './campaign.states';

export const name = 'campaign';
export const campaignSelector = createFeatureSelector<CampaignState>(name);

export const statisticsFetchingSecltor = createSelector(
  campaignSelector,
  (state: CampaignState) => state.statisticsFetching
);

export const statisticsDidFetchSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.statisticsDidFetch
);

export const didFetchSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.didFetch
);

export const processingSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.processing
);

export const fetchingSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.fetching
);

export const filterSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.filter
);

export const dataSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.data
);

export const metaSelector = createSelector(
  campaignSelector,
  (state: CampaignState) => state.meta
);
