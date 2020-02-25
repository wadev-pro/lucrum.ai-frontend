import { RechargeModel } from 'app/shared/models/recharge.model';
import * as actions from './recharge.actions';
import { initialState, RechargeState } from './recharge.states';

export function rechargeReducer(
  state: RechargeState = initialState,
  action: actions.Actions,
): RechargeState {
  switch (action.type) {
    case actions.RechargeActionTypes.LOAD:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: null,
      };
    case actions.RechargeActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: action.payload,
      };

    case actions.RechargeActionTypes.LOAD_FAILURE:
      return {
        ...state,
        didFetch: false,
        data: {...state.data},
      };
    case actions.RechargeActionTypes.CREATE:
      return {
        ...state,
        processing: true,
      };

    case actions.RechargeActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        didFetch: false,
        processing: false,
        data: null,
      };

    case actions.RechargeActionTypes.CREATE_FAILURE:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
