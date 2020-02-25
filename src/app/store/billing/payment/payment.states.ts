import { PaymentModel } from 'app/shared/models/payment.model';
import * as commonModels from '../../../shared/models/common.model';

export interface PaymentState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  created: boolean;
  data: Array<PaymentModel>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: PaymentState = {
  fetching: false,
  didFetch: false,
  processing: false,
  created: false,
  data: [],
  filter: {
    search: '',
    order_by: 'date',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  }
};
