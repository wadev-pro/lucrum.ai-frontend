import { EventHistoryState, initialState } from './event-history.states';

import * as actions from './event-history.actions';

export function eventHistoryReducer(
  state: EventHistoryState = initialState,
  action: actions.Actions
): EventHistoryState {
  switch (action.type) {
    case actions.GET_LIST:
      return {
        ...state,
        didFetch: false,
        fetching: true,
      };
    case actions.GET_LIST_SUCCESSFUL:
      return {
        ...state,
        didFetch: true,
        fetching: false,
        data: action.payload,
      };
    case actions.ADD_ERROR:
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
