import { eventHistoryReducer } from './event-history.reducers';
import { name } from './event-history.selectors';

export const store = {
  name,
  eventHistoryReducer: eventHistoryReducer,
  config: {},
};
