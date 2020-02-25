import { initialState, StatisticsState } from './statistics.states';

import * as actions from './statistics.actions';

export function statisticsReducer(
  state: StatisticsState = initialState,
  action: actions.Actions
): StatisticsState {
  switch (action.type) {
    /* TLD Statistics */
    case actions.GET_TLD:
      return {
        ...state,
        tldFetching: true,
        tldDidFetch: false,
        tldData: [],
        tldFilter: action.payload.filter,
      };
    case actions.GET_TLD_SUCCESS:
      return {
        ...state,
        tldFetching: false,
        tldDidFetch: true,
        tldData: action.payload.data,
        tldMeta: action.payload.meta,
      };
    case actions.GET_TLD_FAILED:
      return {
        ...state,
        tldFetching: false,
        tldDidFetch: false,
        tldData: [],
      };
    case actions.UPDATE_TLD_FILTER:
      return {
        ...state,
        tldDidFetch: false,
        tldFilter: {
          ...state.tldFilter,
          ...action.payload,
        },
      };
    case actions.CLEAR_TLD_DETAIL:
      return {
        ...state,
        tldDidFetch: false,
        tldFetching: false,
        tldData: [],
        tldFilter: initialState.tldFilter,
        tldMeta: initialState.tldMeta,
      };

    /* Template Group Statistics */
    case actions.GET_TEMPLATE_GROUP:
      return {
        ...state,
        templateGroupFetching: true,
        templateGroupDidFetch: false,
        templateGroupData: [],
        templateGroupFilter: action.payload.filter,
      };
    case actions.GET_TEMPLATE_GROUP_SUCCESS:
      return {
        ...state,
        templateGroupFetching: false,
        templateGroupDidFetch: true,
        templateGroupData: action.payload.data,
        templateGroupMeta: action.payload.meta,
      };
    case actions.GET_TEMPLATE_GROUP_FAILED:
      return {
        ...state,
        templateGroupFetching: false,
        templateGroupDidFetch: false,
        templateGroupData: [],
      };
    case actions.UPDATE_TEMPLATE_GROUP_FILTER:
      return {
        ...state,
        templateGroupDidFetch: false,
        templateGroupFilter: {
          ...state.templateGroupFilter,
          ...action.payload,
        },
      };
    case actions.CLEAR_TEMPLATE_GROUP_DETAIL:
      return {
        ...state,
        templateGroupDidFetch: false,
        templateGroupFetching: false,
        templateGroupData: [],
        templateGroupFilter: initialState.templateGroupFilter,
        templateGroupMeta: initialState.templateGroupMeta,
      };

    /* Template Group List */
    case actions.GET_TEMPLATE_GROUP_LIST:
      return {
        ...state,
        templateGroupListFetching: true,
        templateGroupListDidFetch: false,
        templateGroupListData: [],
      };
    case actions.GET_TEMPLATE_GROUP_LIST_SUCCESS:
      return {
        ...state,
        templateGroupListFetching: false,
        templateGroupListDidFetch: true,
        templateGroupListData: action.payload.data,
      };
    case actions.GET_TEMPLATE_GROUP_LIST_FAILED:
      return {
        ...state,
        templateGroupListFetching: false,
        templateGroupListDidFetch: false,
        templateGroupListData: [],
      };
    case actions.UPDATE_TEMPLATE_GROUP_LIST_FILTER:
      return {
        ...state,
        templateGroupListFilter: {
          ...state.templateGroupListFilter,
          ...action.payload,
        },
      };
    case actions.UPDATE_TEMPLATE_GROUP_LIST_META:
      return {
        ...state,
        templateGroupListMeta: {
          ...state.templateGroupListMeta,
          ...action.payload,
        },
      };
    case actions.CLEAR_TEMPLATE_GROUP_LIST:
      return {
        ...state,
        templateGroupListDidFetch: false,
        templateGroupListFetching: false,
        templateGroupListData: [],
        templateGroupListFilter: initialState.templateGroupListFilter,
        templateGroupListMeta: initialState.templateGroupListMeta,
      };
    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
