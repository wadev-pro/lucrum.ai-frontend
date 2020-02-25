import { didPoolReducer } from './did-pool.reducers';
import { name } from './did-pool.selectors';

export const store = {
  name,
  didPoolReducer: didPoolReducer,
  config: {},
};
