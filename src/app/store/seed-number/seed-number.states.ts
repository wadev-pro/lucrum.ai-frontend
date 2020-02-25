import * as commonModels from 'app/shared/models/common.model';
import { SeedNumber } from 'app/shared/models/seed-number.model';

export interface SeedNumberState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<SeedNumber>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: SeedNumberState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: [],
  filter: {
    search: '',
    order_by: 'seedNumber',
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
  },
};
