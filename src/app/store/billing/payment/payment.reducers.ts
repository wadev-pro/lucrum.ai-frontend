import * as actions from './payment.actions';
import { initialState, PaymentState } from './payment.states';

export function paymentReducer(
  state: PaymentState = initialState,
  action: actions.Actions,
): PaymentState {
  switch (action.type) {
    case actions.PaymentActionTypes.GET_LIST:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: [],
      };
    case actions.PaymentActionTypes.GET_LIST_SUCCESS:
      return getListSuccessful(state, action.payload);
    case actions.PaymentActionTypes.LOAD:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: null,
      };
    case actions.PaymentActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: [action.payload],
      };

    case actions.PaymentActionTypes.LOAD_FAILURE:
      return {
        ...state,
        didFetch: false,
        data: {...state.data},
      };
    case actions.PaymentActionTypes.LOAD_BALANCE:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: null,
      };
    case actions.PaymentActionTypes.LOAD_BALANCE_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: [action.payload],
      };

    case actions.PaymentActionTypes.LOAD_BALANCE_FAILURE:
      return {
        ...state,
        didFetch: false,
        data: {...state.data},
      };
    case actions.PaymentActionTypes.UPDATE_BALANCE:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: null,
      };
    case actions.PaymentActionTypes.UPDATE_BALANCE_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: [action.payload],
      };

    case actions.PaymentActionTypes.UPDATE_BALANCE_FAILURE:
      return {
        ...state,
        didFetch: false,
        data: {...state.data},
      };
    case actions.PaymentActionTypes.UPDATE_PRICING:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: null,
      };
    case actions.PaymentActionTypes.UPDATE_PRICING_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: [action.payload],
      };

    case actions.PaymentActionTypes.UPDATE_PRICING_FAILURE:
      return {
        ...state,
        didFetch: false,
        data: {...state.data},
      };
    case actions.PaymentActionTypes.CREATE:
      return {
        ...state,
        created: false,
        processing: true,
      };

    case actions.PaymentActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        didFetch: false,
        created: true,
        processing: false,
        data: null,
      };

    case actions.PaymentActionTypes.CREATE_FAILURE:
      return {
        ...state,
        created: false,
        processing: false,
      };
    case actions.PaymentActionTypes.UPDATE_FILTER:
      return {
        ...state,
        didFetch: false,
        data: [],
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
function getListSuccessful(state: PaymentState, result: any): PaymentState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    created: false,
    data: result.rows,
    meta: { ...state.meta, total: result.count }
  };
}
