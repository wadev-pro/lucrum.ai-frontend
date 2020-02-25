import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampaignDetailState } from './campaign-detail.states';

export const name = 'campaignDetail';
export const campaignSelector = createFeatureSelector<CampaignDetailState>(
  name
);

export const didFetchSelector = createSelector(
  campaignSelector,
  (state: CampaignDetailState) => state.didFetch
);

export const fetchingSelector = createSelector(
  campaignSelector,
  (state: CampaignDetailState) => state.fetching
);

export const dataSelector = createSelector(
  campaignSelector,
  (state: CampaignDetailState) => state.data
);

export const isOldSelector = createSelector(
  campaignSelector,
  (state: CampaignDetailState) => state.is_old
);

export const campaignIdSelector = createSelector(
  campaignSelector,
  (state: CampaignDetailState) => state.campaign_id
);
