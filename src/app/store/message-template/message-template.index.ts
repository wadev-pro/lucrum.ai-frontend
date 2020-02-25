import { messageTemplateReducer } from './message-template.reducers';
import { name } from './message-template.selectors';

export const store = {
  name,
  messageTemplateReducer: messageTemplateReducer,
  config: {},
};
