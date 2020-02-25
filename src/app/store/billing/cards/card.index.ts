import { cardReducer } from './card.reducers';
import { name } from './card.selectors';

export const store = {
  name,
  cardReducer,
  config: {},
};
