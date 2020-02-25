import { initialState, UploaderStatusState } from './uploader-status.states';

import * as actions from './uploader-status.actions';

export function uploaderStautsReducer(
  state: UploaderStatusState = initialState,
  action: actions.Actions
): UploaderStatusState {
  switch (action.type) {
    case actions.GET_LIST:
      return {
        ...state,
        fetching: true,
      };
    case actions.GET_LIST_SUCCESSFUL:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        didFetch: true,
      };
    case actions.GET_LIST_FAILED:
      return {
        ...state,
        fetching: false,
        didFetch: false,
      };
    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
