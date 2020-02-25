import { uploaderStautsReducer } from './uploader-status.reducers';
import { name } from './uploader-status.selectors';

export const store = {
  name,
  uploaderStautsReducer: uploaderStautsReducer,
  config: {},
};
