import { initialState, MessageTemplateState } from './message-template.states';

import { MessageTemplate } from 'app/shared/models/message-template.model';
import * as actions from './message-template.actions';

export function messageTemplateReducer(
  state: MessageTemplateState = initialState,
  action: actions.Actions
): MessageTemplateState {
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
  state: MessageTemplateState,
  result: MessageTemplate
): MessageTemplateState {
  const data = state.data.slice(0);
  const index = data.findIndex(
    (item: MessageTemplate) => item.templateId === result.templateId
  );
  data.splice(index, 1, result);
  return {
    ...state,
    processing: false,
    data: data,
  };
}
