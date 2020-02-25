import { paymentReducer } from './payment.reducers';
import { name } from './payment.selectors';

export const store = {
  name,
  paymentReducer,
  config: {},
};
