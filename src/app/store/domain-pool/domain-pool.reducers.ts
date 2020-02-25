import { DomainPoolState, initialState } from './domain-pool.states';

import * as actions from './domain-pool.actions';

export function domainPoolReducer(
  state: DomainPoolState = initialState,
  action: actions.Actions
): DomainPoolState {
  switch (action.type) {
    case actions.GET_LIST:
      return {
        ...state,
        fetching: true,
        didFetch: false,
        data: [],
      };
    case actions.GET_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: action.payload,
      };

    /* Add Domain */
    case actions.ADD_DOMAIN:
      return {
        ...state,
        processing: true,
      };

    case actions.ADD_DOMAIN_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    /* Edit Domain */
    case actions.EDIT_DOMAIN:
      return {
        ...state,
        processing: true,
      };

    case actions.EDIT_DOMAIN_SUCCESS:
      return editDomainSuccessful(state, action.payload);

    /* Delete All Domain */
    case actions.DELETE_DOMAIN:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_DOMAIN_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    case actions.ADD_ERROR:
      return {
        ...state,
        fetching: false,
        processing: false,
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
    case actions.CLEAR_DETAIL:
      return initialState;
    default:
      return state;
  }
}

function editDomainSuccessful(
  state: DomainPoolState,
  payload: actions.EditDomainSuccessPayload
): DomainPoolState {
  const domains = state.data.slice(0);
  const index = payload.index % state.filter.per_page;
  domains.splice(index - 1, 1, {
    no: payload.index,
    domain: payload.domain.domain,
  });
  return {
    ...state,
    processing: false,
    data: domains,
  };
}
