import * as campaignModels from 'app/shared/models/campaign.model';
import * as actions from './campaign-detail.actions';
import { CampaignDetailState, initialState } from './campaign-detail.states';

export function campaignDetailReducer(
  state: CampaignDetailState = initialState,
  action: actions.Actions
): CampaignDetailState {
  switch (action.type) {
    case actions.UPDATE_CAMPAIGN_ID:
      return {
        ...state,
        campaign_id: action.payload,
      };
    case actions.UPDATE_DETAIL:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case actions.GET_DETAIL:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        is_old: false,
        data: initialState.data,
      };
    case actions.GET_DETAIL_DB:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        is_old: true,
        data: initialState.data,
      };
    case actions.GET_DETAIL_SUCCESSFUL:
      return getDetailSuccessful(state, action.payload);
    case actions.GET_DETAIL_FAILED:
      return {
        ...state,
        didFetch: false,
        fetching: false,
      };

    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };

    case actions.ADD_ERROR:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}

function getDetailSuccessful(
  state: CampaignDetailState,
  result: campaignModels.CampaignDetail
): CampaignDetailState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    data: {
      ...state.data,
      ...result,
    },
  };
}
