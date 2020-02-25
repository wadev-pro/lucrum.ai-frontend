import { statisticsReducer } from './statistics.reducers';
import { name } from './statistics.selectors';

export const store = {
  name,
  statisticsReducer: statisticsReducer,
  config: {},
};
