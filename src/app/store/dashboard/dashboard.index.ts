import { dashboardReducer } from './dashboard.reducers';
import { name } from './dashboard.selectors';

export const store = {
  name,
  dashboardReducer: dashboardReducer,
  config: {},
};
