import { Did } from 'app/shared/models/dids.model';
import { DidState, initialState } from './did.states';

import * as actions from './did.actions';

export function didReducer(
  state: DidState = initialState,
  action: actions.Actions
): DidState {
  switch (action.type) {
    /* Get List */
    case actions.GET_LIST:
      return {
        ...state,
        didFetch: false,
        fetching: true,
      };
    case actions.GET_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: action.payload.data,
        meta: action.payload.meta,
      };

    case actions.UPDATE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    case actions.UPDATE_META:
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      };

    /* Activate */
    case actions.ACTIVATE:
      return {
        ...state,
        processing: true,
      };

    case actions.ACTIVATE_SUCCESS:
      return activateSuccess(state, action.payload);

    /* Deactivate */
    case actions.DEACTIVATE:
      return {
        ...state,
        processing: true,
      };

    case actions.DEACTIVATE_SUCCESS:
      return activateSuccess(state, action.payload);

    /* Delete */
    case actions.DELETE:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_SUCCESS:
      return {
        ...state,
        processing: false,
        didFetch: false,
        data: [],
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

function activateSuccess(state: DidState, result: Did): DidState {
  const data = state.data.slice(0);
  const index = data.findIndex((item: Did) => item.id === result.id);
  const updateItem = {
    ...data[index],
    status: result.status,
  };
  data.splice(index, 1, updateItem);
  return {
    ...state,
    processing: false,
    data: data,
  };
}
