import { DidPoolState, initialState } from './did-pool.states';

import { getCurrentUTCTime } from 'app/shared/helpers/utils';
import { DidPool, DidPoolRequest } from 'app/shared/models/did-pool.model';
import * as actions from './did-pool.actions';

export function didPoolReducer(
  state: DidPoolState = initialState,
  action: actions.Actions
): DidPoolState {
  switch (action.type) {
    /* Get List */
    case actions.GET_LIST:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: [],
      };
    case actions.GET_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: action.payload.items,
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

    /* Create */
    case actions.CREATE:
      return {
        ...state,
        processing: true,
      };

    case actions.CREATE_SUCCESS:
      return {
        ...state,
        processing: false,
        data: [...state.data, action.payload],
        createSuccess: action.payload,
      };

    case actions.DELETE_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: null,
      };

    /* Update */
    case actions.UPDATE:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_SUCCESS:
      return updateSuccessful(state, action.payload);

    case actions.ADD_ERROR:
      return {
        ...state,
        fetching: false,
        didFetch: false,
        processing: false,
      };
    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function updateSuccessful(
  state: DidPoolState,
  result: DidPoolRequest
): DidPoolState {
  const data = state.data.slice(0);
  const index = data.findIndex((item: DidPool) => item.id === result.id);
  const prevItem = data.find((item: DidPool) => item.id === result.id);
  const newData: DidPool = {
    ...prevItem,
    maxDidPoolSize: result.maxPoolSize,
    minPoolSize: result.minPoolSize,
    autoPurchaseDids: result.autoPurchaseDids,
    didCostAmount: result.didCost,
    didCodeCostCurrency: result.currency,
    lastUpdateAt: getCurrentUTCTime(),
    username: result.username,
    password: result.password,
    name: result.name,
    mtSmsCost: result.mtSmsCost,
  };
  data.splice(index, 1, newData);
  return {
    ...state,
    processing: false,
    data: data,
  };
}
