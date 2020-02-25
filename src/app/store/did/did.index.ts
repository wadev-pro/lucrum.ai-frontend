import { didReducer } from './did.reducers';
import { name } from './did.selectors';

export const store = {
  name,
  didReducer: didReducer,
  config: {},
};
