import { initialState, ReportsState } from './report.states';

import * as actions from './report.actions';

export function reportsReducer(
  state: ReportsState = initialState,
  action: actions.Actions
): ReportsState {
  switch (action.type) {
    /* Lead Report */
    case actions.GET_LEAD:
      return {
        ...state,
        leadFetching: true,
        leadDidFetch: false,
        leadData: [],
        leadFilter: action.payload.filter,
      };
    case actions.GET_LEAD_SUCCESS:
      return {
        ...state,
        leadFetching: false,
        leadDidFetch: true,
        leadData: action.payload.data,
        leadMeta: action.payload.meta,
      };
    case actions.GET_LEAD_FAILED:
      return {
        ...state,
        leadFetching: false,
        leadDidFetch: false,
        leadData: [],
      };
    case actions.UPDATE_LEAD_FILTER:
      return {
        ...state,
        leadDidFetch: false,
        leadFilter: {
          ...state.leadFilter,
          ...action.payload,
        },
      };
    case actions.CLEAR_LEAD_DETAIL:
      return {
        ...state,
        leadDidFetch: false,
        leadFetching: false,
        leadData: [],
        leadFilter: initialState.leadFilter,
        leadMeta: initialState.leadMeta,
      };

    default:
      return state;
  }
}
