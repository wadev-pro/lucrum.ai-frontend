import {
  initialState,
  MessageTemplateGroupState,
} from './message-template-group.states';

import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import * as actions from './message-template-group.actions';

export function messageTemplateGroupReducer(
  state: MessageTemplateGroupState = initialState,
  action: actions.Actions
): MessageTemplateGroupState {
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
        data: action.payload.data,
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

    /* Update */
    case actions.UPDATE:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_SUCCESS:
      return updateSuccessful(state, action.payload);

    /* Delete */
    case actions.DELETE:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_SUCCESS:
      return updateSuccessful(state, action.payload);

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

function updateSuccessful(
  state: MessageTemplateGroupState,
  result: MessageTemplateGroup
): MessageTemplateGroupState {
  const data = state.data.slice(0);
  const index = data.findIndex(
    (item: MessageTemplateGroup) => item.groupId === result.groupId
  );
  data.splice(index, 1, result);
  return {
    ...state,
    processing: false,
    data: data,
  };
}
