import { campaignReducer } from './campaign.reducers';
import { name } from './campaign.selectors';

export const store = {
  name,
  campaignReducer: campaignReducer,
  config: {},
};
