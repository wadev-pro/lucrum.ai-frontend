import { campaignDetailReducer } from './campaign-detail.reducers';
import { name } from './campaign-detail.selectors';

export const store = {
  name,
  campaignDetailReducer: campaignDetailReducer,
  config: {},
};
