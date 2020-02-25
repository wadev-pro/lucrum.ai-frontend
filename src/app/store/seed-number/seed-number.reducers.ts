import { initialState, SeedNumberState } from './seed-number.states';

import { SeedNumber } from 'app/shared/models/seed-number.model';
import * as actions from './seed-number.actions';

export function seedNumberReducer(
  state: SeedNumberState = initialState,
  action: actions.Actions
): SeedNumberState {
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
        data: action.payload,
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
      };

    /* Delete */
    case actions.DELETE:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_SUCCESS:
      return deleteSuccessful(state, action.payload);

    case actions.ADD_ERROR:
      return {
        ...state,
        fetching: false,
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

function deleteSuccessful(
  state: SeedNumberState,
  number: string
): SeedNumberState {
  const data = state.data.slice(0);
  const index = data.findIndex(
    (item: SeedNumber) => item.seedNumber === number
  );
  data.splice(index, 1);
  return {
    ...state,
    processing: false,
    data: data,
  };
}
