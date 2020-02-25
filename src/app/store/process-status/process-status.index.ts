import { processStautsReducer } from './process-status.reducers';
import { name } from './process-status.selectors';

export const store = {
  name,
  processStautsReducer: processStautsReducer,
  config: {},
};
