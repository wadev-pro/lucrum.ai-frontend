import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampaignStatisticsState } from './campaign-statistics.states';

export const name = 'campaignStatistics';
export const campaignStatisticsSelector = createFeatureSelector<
  CampaignStatisticsState
>(name);

/* Message Count Statistics Selector */

export const messageCountDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageCountDidFetch
);

export const messageCountFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageCountFetching
);

export const messageCountSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageCount
);

/* Carrier Statistics Selector */

export const carrierDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.carrierDidFetch
);

export const carrierFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.carrierFetching
);

export const carrierSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.carrierData
);

export const carrierFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.carrierFilter
);

export const carrierMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.carrierMeta
);

/* Did Statistics Selector */

export const didDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.didDidFetch
);

export const didFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.didFetching
);

export const didSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.didData
);

export const didFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.didFilter
);

export const didMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.didMeta
);

/* Message Template Statistics Selector */

export const messageTemplateDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageTemplateDidFetch
);

export const messageTemplateFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageTemplateFetching
);

export const messageTemplateSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageTemplateData
);

export const messageTemplateFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageTemplateFilter
);

export const messageTemplateMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageTemplateMeta
);

/* Tld Statistics Selector */

export const tldDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.tldDidFetch
);

export const tldFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.tldFetching
);

export const tldSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.tldData
);

export const tldFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.tldFilter
);

export const tldMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.tldMeta
);

/* Message Sent Statistics Selector */

export const messageSentDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageSentDidFetch
);

export const messageSentFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageSentFetching
);

export const messageSentSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageSentData
);

export const messageSentFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageSentFilter
);

export const messageSentMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.messageSentMeta
);

/* Click Statistics Selector */

export const clickDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.clickDidFetch
);

export const clickFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.clickFetching
);

export const clickSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.clickData
);

export const clickFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.clickFilter
);

export const clickMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.clickMeta
);

/* Conversion Statistics Selector */

export const conversionDidFetchSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.conversionDidFetch
);

export const conversionFetchingSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.conversionFetching
);

export const conversionSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.conversionData
);

export const conversionFilterSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.conversionFilter
);

export const conversionMetaSelector = createSelector(
  campaignStatisticsSelector,
  (state: CampaignStatisticsState) => state.conversionMeta
);
