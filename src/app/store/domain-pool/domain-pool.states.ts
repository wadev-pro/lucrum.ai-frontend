import * as commonModels from 'app/shared/models/common.model';
import * as domainModels from 'app/shared/models/domain-pool.models';

export interface DomainPoolState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<domainModels.DomainPool>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: DomainPoolState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: [],
  filter: {
    search: '',
    order_by: 'name',
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
