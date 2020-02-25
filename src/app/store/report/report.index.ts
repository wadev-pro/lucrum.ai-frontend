import { reportsReducer } from './report.reducers';
import { name } from './report.selectors';

export const store = {
  name,
  reportsReducer: reportsReducer,
  config: {},
};
