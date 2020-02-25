import { seedNumberReducer } from './seed-number.reducers';
import { name } from './seed-number.selectors';

export const store = {
  name,
  seedNumberReducer: seedNumberReducer,
  config: {},
};
