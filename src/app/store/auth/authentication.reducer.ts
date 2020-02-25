import { Action } from '@ngrx/store';
import { AuthenticationState, initialState } from './authentication.state';

import * as actions from './authentication.action';

export function authenticationReducer(
  state = initialState,
  action: actions.Actions
): AuthenticationState {
  switch (action.type) {
    case actions.LOGIN_SUCCESFUL:
      return loginSuccessful(
        state,
        (action as actions.LoginSuccessful).payload
      );

    case actions.LOGIN_FAILED:
      return {
        ...state,
        didFetch: false,
        fetching: false,
      };

    case actions.GET_USER_INFO:
      return {
        ...state,
        didFetch: false,
        fetching: true,
      };

    case actions.GET_USER_INFO_SUCCESSFUL:
      return {
        ...state,
        didFetch: true,
        fetching: false,
        data: action.payload,
      };

    case actions.GET_USER_INFO_FAILED:
      return {
        ...state,
        didFetch: false,
        fetching: false,
      };

    case actions.UPDATE_USER_INFO:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_USER_INFO_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case actions.UPDATE_USER_INFO_FAILED:
      return {
        ...state,
        processing: false,
      };

    case actions.LOGOUT_SUCCESSFUL:
      return initialState;
    default:
      return state;
  }
}

function loginSuccessful(
  state: AuthenticationState,
  result: actions.LoginSuccessfulPayload
): AuthenticationState {
  return {
    ...state,
    data: {
      authorization: `${result.token_type} ${result.access_token}`,
      ...state.data,
    },
  };
}
