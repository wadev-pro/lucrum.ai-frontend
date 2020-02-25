import * as commonModels from 'app/shared/models/common.model';
import * as templateGroupModels from 'app/shared/models/message-template-group.model';

export interface MessageTemplateGroupState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<templateGroupModels.MessageTemplateGroup>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: MessageTemplateGroupState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: [],
  filter: {
    search: '',
    order_by: 'createdAt',
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
