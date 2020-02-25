import { CardModel } from 'app/shared/models/card.model';
import * as actions from './card.actions';
import { initialState, CardState } from './card.states';

export function cardReducer(
  state: CardState = initialState,
  action: actions.Actions,
): CardState {
  switch (action.type) {
    case actions.CardActionTypes.LOAD:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        data: initialState.data,
      };
    case actions.CardActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        fetching: false,
        didFetch: true,
        data: action.payload,
      };

    case actions.CardActionTypes.LOAD_FAILURE:
      return {
        ...state,
        didFetch: false,
        data: {...state.data},
      };
    case actions.CardActionTypes.CREATE:
      return {
        ...state,
        processing: true,
      };

    case actions.CardActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        didFetch: false,
        processing: false,
        data: null,
      };

    case actions.CardActionTypes.CREATE_FAILURE:
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
