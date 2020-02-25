import { reportStatusReducer } from './report-status.reducers';
import { name } from './report-status.selectors';

export const store = {
  name,
  reportStatusReducer: reportStatusReducer,
  config: {},
};
