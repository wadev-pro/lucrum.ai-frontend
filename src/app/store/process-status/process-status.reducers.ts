import { initialState, ProcessStatusState } from './process-status.states';

import * as actions from './process-status.actions';

export function processStautsReducer(
  state: ProcessStatusState = initialState,
  action: actions.Actions
): ProcessStatusState {
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
