import { messageTemplateGroupReducer } from './message-template-group.reducers';
import { name } from './message-template-group.selectors';

export const store = {
  name,
  messageTemplateGroupReducer: messageTemplateGroupReducer,
  config: {},
};
