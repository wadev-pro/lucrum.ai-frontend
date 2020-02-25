import { DashboardState, initialState } from './dashboard.states';

import * as actions from './dashboard.actions';

export function dashboardReducer(
  state: DashboardState = initialState,
  action: actions.Actions
): DashboardState {
  switch (action.type) {
    case actions.UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case actions.GET_STATISTICS:
      return {
        ...state,
        fetching: true,
        filter: action.payload,
        data: initialState.data,
      };
    case actions.GET_STATISTICS_SUCCESSFUL:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        didFetch: true,
      };
    case actions.GET_STATISTICS_FAILED:
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
