import {
  CampaignStatisticsState,
  initialState,
} from './campaign-statistics.states';

import * as actions from './campaign-statistics.actions';

export function campaignStatisticsReducer(
  state: CampaignStatisticsState = initialState,
  action: actions.Actions
): CampaignStatisticsState {
  switch (action.type) {
    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };
    /* Message Count Statistics */
    case actions.GET_MESSAGE_COUNT:
      return {
        ...state,
        messageCountFetching: true,
        messageCountDidFetch: false,
        messageCount: initialState.messageCount,
      };
    case actions.GET_MESSAGE_COUNT_SUCCESS:
      return {
        ...state,
        messageCountFetching: false,
        messageCountDidFetch: true,
        messageCount: action.payload,
      };
    case actions.GET_MESSAGE_COUNT_FAILED:
      return {
        ...state,
        messageCountFetching: false,
        messageCountDidFetch: false,
        messageCount: initialState.messageCount,
      };
    /* Carrier Statistics */
    case actions.GET_CARRIER:
      return {
        ...state,
        carrierFetching: true,
        carrierDidFetch: false,
        carrierData: [],
        carrierFilter: action.payload.filter,
      };
    case actions.GET_CARRIER_SUCCESS:
      return {
        ...state,
        carrierFetching: false,
        carrierDidFetch: true,
        carrierData: action.payload.data,
        carrierMeta: action.payload.meta,
      };
    case actions.GET_CARRIER_FAILED:
      return {
        ...state,
        carrierFetching: false,
        carrierDidFetch: false,
        carrierData: [],
      };
    case actions.UPDATE_CARRIER_FILTER:
      return {
        ...state,
        carrierData: [],
        carrierDidFetch: false,
        carrierFilter: {
          ...state.carrierFilter,
          ...action.payload,
        },
      };

    /* Did statistics */
    case actions.GET_DID:
      return {
        ...state,
        didFetching: true,
        didDidFetch: false,
        didData: [],
        didFilter: action.payload.filter,
      };
    case actions.GET_DID_SUCCESS:
      return {
        ...state,
        didFetching: false,
        didDidFetch: true,
        didData: action.payload.data,
        didMeta: action.payload.meta,
      };
    case actions.GET_DID_FAILED:
      return {
        ...state,
        didFetching: false,
        didDidFetch: false,
        didData: [],
      };
    case actions.UPDATE_DID_FILTER:
      return {
        ...state,
        didData: [],
        didDidFetch: false,
        didFilter: {
          ...state.didFilter,
          ...action.payload,
        },
      };

    /* Message Template Statistics */
    case actions.GET_MESSAGE_TEMPLATE:
      return {
        ...state,
        messageTemplateFetching: true,
        messageTemplateDidFetch: false,
        messageTemplateData: [],
        messageTemplateFilter: action.payload.filter,
      };
    case actions.GET_MESSAGE_TEMPLATE_SUCCESS:
      return {
        ...state,
        messageTemplateFetching: false,
        messageTemplateDidFetch: true,
        messageTemplateData: action.payload.data,
        messageTemplateMeta: action.payload.meta,
      };
    case actions.GET_MESSAGE_TEMPLATE_FAILED:
      return {
        ...state,
        messageTemplateFetching: false,
        messageTemplateDidFetch: false,
        messageTemplateData: [],
      };
    case actions.UPDATE_MESSAGE_TEMPLATE_FILTER:
      return {
        ...state,
        messageTemplateData: [],
        messageTemplateDidFetch: false,
        messageTemplateFilter: {
          ...state.messageTemplateFilter,
          ...action.payload,
        },
      };

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
        tldData: [],
        tldDidFetch: false,
        tldFilter: {
          ...state.tldFilter,
          ...action.payload,
        },
      };

    /* Message Sent Statistics */
    case actions.GET_MESSAGE_SENT:
      return {
        ...state,
        messageSentFetching: true,
        messageSentDidFetch: false,
        messageSentData: [],
        messageSentFilter: action.payload.filter,
      };
    case actions.GET_MESSAGE_SENT_SUCCESS:
      return {
        ...state,
        messageSentFetching: false,
        messageSentDidFetch: true,
        messageSentData: action.payload.data,
        messageSentMeta: action.payload.meta,
      };
    case actions.GET_MESSAGE_SENT_FAILED:
      return {
        ...state,
        messageSentFetching: false,
        messageSentDidFetch: false,
        messageSentData: [],
      };
    case actions.UPDATE_MESSAGE_SENT_FILTER:
      return {
        ...state,
        messageSentData: [],
        messageSentDidFetch: false,
        messageSentFilter: {
          ...state.messageSentFilter,
          ...action.payload,
        },
      };

    /* Click Statistics */
    case actions.GET_CLICK:
      return {
        ...state,
        clickFetching: true,
        clickDidFetch: false,
        clickData: [],
        clickFilter: action.payload.filter,
      };
    case actions.GET_CLICK_SUCCESS:
      return {
        ...state,
        clickFetching: false,
        clickDidFetch: true,
        clickData: action.payload.data,
        clickMeta: action.payload.meta,
      };
    case actions.GET_CLICK_FAILED:
      return {
        ...state,
        clickFetching: false,
        clickDidFetch: false,
        clickData: [],
      };
    case actions.UPDATE_CLICK_FILTER:
      return {
        ...state,
        clickData: [],
        clickDidFetch: false,
        clickFilter: {
          ...state.clickFilter,
          ...action.payload,
        },
      };

    /* Conversion Statistics */
    case actions.GET_CONVERSION:
      return {
        ...state,
        conversionFetching: true,
        conversionDidFetch: false,
        conversionData: [],
        conversionFilter: action.payload.filter,
      };
    case actions.GET_CONVERSION_SUCCESS:
      return {
        ...state,
        conversionFetching: false,
        conversionDidFetch: true,
        conversionData: action.payload.data,
        conversionMeta: action.payload.meta,
      };
    case actions.GET_CONVERSION_FAILED:
      return {
        ...state,
        conversionFetching: false,
        conversionDidFetch: false,
        conversionData: [],
      };
    case actions.UPDATE_CONVERSION_FILTER:
      return {
        ...state,
        conversionData: [],
        conversionDidFetch: false,
        conversionFilter: {
          ...state.conversionFilter,
          ...action.payload,
        },
      };

    case actions.ADD_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
