import { domainPoolReducer } from './domain-pool.reducers';
import { name } from './domain-pool.selectors';

export const store = {
  name,
  domainPoolReducer: domainPoolReducer,
  config: {},
};
