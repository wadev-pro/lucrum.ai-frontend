import * as commonModels from 'app/shared/models/common.model';
import * as didModels from 'app/shared/models/dids.model';

export interface DidState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<didModels.Did>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: DidState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: [],
  filter: {
    search: '',
    order_by: 'did_code',
    order_dir: 'asc',
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
  },
};
