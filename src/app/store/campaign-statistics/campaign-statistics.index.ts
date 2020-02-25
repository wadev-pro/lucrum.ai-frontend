import { campaignStatisticsReducer } from './campaign-statistics.reducers';
import { name } from './campaign-statistics.selectors';

export const store = {
  name,
  campaignStatisticsReducer: campaignStatisticsReducer,
  config: {},
};
