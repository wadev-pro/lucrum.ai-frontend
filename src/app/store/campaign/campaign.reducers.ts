import { updateCampaignsWithStatistics } from 'app/shared/helpers/campaign.helper';
import * as campaignModels from 'app/shared/models/campaign.model';
import * as actions from './campaign.actions';
import { UpdateItemPayload } from './campaign.actions';
import { CampaignState, initialState } from './campaign.states';

export function campaignReducer(
  state: CampaignState = initialState,
  action: actions.Actions
): CampaignState {
  switch (action.type) {
    case actions.UPDATE_FILTER:
      return {
        ...state,
        didFetch: false,
        statisticsDidFetch: false,
        data: [],
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    case actions.GET_LIST:
      return {
        ...state,
        didFetch: false,
        fetching: true,
        statisticsFetching: false,
        statisticsDidFetch: false,
        data: [],
        filter: {
          ...action.payload,
        },
      };
    case actions.GET_LIST_SUCCESSFUL:
      return getListSuccessful(state, action.payload);
    case actions.GET_LIST_FAILED:
      return {
        ...state,
        didFetch: false,
        fetching: false,
        filter: {
          ...state.filter,
        },
      };
    case actions.GET_STATISTICS:
      return {
        ...state,
        statisticsFetching: true,
        statisticsDidFetch: false,
        filter: {
          ...state.filter,
        },
      };
    case actions.GET_STATISTICS_SUCCESSFUL:
      return getStatisticsSuccessful(state, action.payload);
    case actions.GET_STATISTICS_FAILED:
      return {
        ...state,
        statisticsFetching: false,
        statisticsDidFetch: false,
      };

    case actions.START_CAMPAIGN:
      return updateCampaignStatus(state, action.payload.campaign_id, 3);

    case actions.START_CAMPAIGN_SUCCESS:
      return updateCampaignStatus(state, action.payload.campaign_id, 4, true);

    case actions.START_CAMPAIGN_FAILED:
      return updateCampaignStatus(state, action.payload.campaign_id, 13, true);

    case actions.STOP_CAMPAIGN:
      return updateCampaignStatus(state, action.payload.campaign_id, 10);

    case actions.STOP_CAMPAIGN_SUCCESS:
      return updateCampaignStatus(state, action.payload.campaign_id, 10);

    case actions.STOP_CAMPAIGN_FAILED:
      return updateCampaignStatus(state, action.payload.campaign_id, 11, true);

    case actions.MARK_CAMPAIGN_STOPPED:
      return updateCampaignStatus(state, action.payload.campaign_id, 10);

    case actions.MARK_CAMPAIGN_STOPPED_SUCCESS:
      return updateCampaignStatus(state, action.payload.campaign_id, 12, true);

    case actions.MARK_CAMPAIGN_STOPPED_FAILED:
      return updateCampaignStatus(state, action.payload.campaign_id, 12, true);

    case actions.TEST_CAMPAIGN:
      return {
        ...state,
        processing: true,
      };

    case actions.TEST_CAMPAIGN_SUCCESS:
      return updateCampaignStatus(state, action.payload.campaign_id, 17, true);

    case actions.TEST_CAMPAIGN_FAILED:
      return updateCampaignStatus(state, action.payload.campaign_id, 18, true);

    case actions.CHECK_CAMPAIGN:
      return {
        ...state,
        processing: true,
      };

    case actions.CHECK_CAMPAIGN_SUCCESS:
      return updateCampaignStatus(state, action.payload.campaign_id, 19, true);

    case actions.CHECK_CAMPAIGN_FAILED:
      return updateCampaignStatus(state, action.payload.campaign_id, 15, true);

    case actions.STOP_CHECK_CAMPAIGN:
      return {
        ...state,
        processing: true,
      };

    case actions.STOP_CHECK_CAMPAIGN_SUCCESS:
      return updateCampaignStatus(state, action.payload.campaign_id, 2, true);

    case actions.STOP_CHECK_CAMPAIGN_FAILED:
      return updateCampaignStatus(state, action.payload.campaign_id, 15, true);

    case actions.DELETE_CAMPAIGN_JOB:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_CAMPAIGN_JOB_SUCCESS:
      return {
        ...state,
        processing: false,
      };

    case actions.DELETE_CAMPAIGN_JOB_FAILED:
      return {
        ...state,
        processing: false,
      };

    case actions.UPDATE_ITEM:
      return updateItem(state, action.payload);
    case actions.ADD_ERROR:
      return {
        ...state,
        processing: false,
        fetching: false,
        statisticsFetching: false,
      };

    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function getListSuccessful(
  state: CampaignState,
  result: campaignModels.CampaignResponse
): CampaignState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    data: result.data,
    links: result.link,
    meta: result.meta,
  };
}

function getStatisticsSuccessful(
  state: CampaignState,
  result: Array<campaignModels.CampaignStatistics>
): CampaignState {
  return {
    ...state,
    statisticsFetching: false,
    statisticsDidFetch: true,
    data: updateCampaignsWithStatistics(state.data, result),
  };
}

function updateItem(
  state: CampaignState,
  result: UpdateItemPayload
): CampaignState {
  const { data: data } = state;
  const campaign_id = result.campaign_id;
  const index = data.findIndex(item => item.campaign_id === campaign_id);
  const newItem = {
    ...data[index],
    ...result.data,
  };
  data.splice(index, 1, newItem);
  return {
    ...state,
    data: data,
  };
}

function updateCampaignStatus(
  state: CampaignState,
  campaign_id: string,
  status: number,
  success: boolean = false
): CampaignState {
  const data = state.data.slice(0);
  const index = data.findIndex(item => item.campaign_id === campaign_id);
  const newItem = {
    ...data[index],
    processing_status: status,
  };
  data.splice(index, 1, newItem);
  return {
    ...state,
    processing: success ? false : true,
    data: data,
  };
}
