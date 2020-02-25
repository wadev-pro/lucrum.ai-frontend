import { GatewayProviderState, initialState } from './gateway-provider.states';

import * as actions from './gateway-provider.actions';

export function gatewayProviderReducer(
  state: GatewayProviderState = initialState,
  action: actions.Actions
): GatewayProviderState {
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
