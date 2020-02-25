import * as campaignStatisticsModels from 'app/shared/models/campaign-statistics.models';
import * as commonModels from 'app/shared/models/common.model';

export interface CampaignStatisticsState {
  messageCountFetching: boolean;
  messageCountDidFetch: boolean;
  messageCount: campaignStatisticsModels.MessageCount;
  carrierFetching: boolean;
  carrierDidFetch: boolean;
  carrierData: Array<campaignStatisticsModels.Carrier>;
  carrierFilter: commonModels.Filter;
  carrierMeta: commonModels.Meta;
  didFetching: boolean;
  didDidFetch: boolean;
  didData: Array<campaignStatisticsModels.Did>;
  didFilter: commonModels.Filter;
  didMeta: commonModels.Meta;
  messageTemplateFetching: boolean;
  messageTemplateDidFetch: boolean;
  messageTemplateData: Array<campaignStatisticsModels.MessageTemplate>;
  messageTemplateFilter: commonModels.Filter;
  messageTemplateMeta: commonModels.Meta;
  tldFetching: boolean;
  tldDidFetch: boolean;
  tldData: Array<campaignStatisticsModels.Tld>;
  tldFilter: commonModels.Filter;
  tldMeta: commonModels.Meta;
  messageSentFetching: boolean;
  messageSentDidFetch: boolean;
  messageSentData: Array<campaignStatisticsModels.MessageSent>;
  messageSentFilter: commonModels.Filter;
  messageSentMeta: commonModels.Meta;
  clickFetching: boolean;
  clickDidFetch: boolean;
  clickData: Array<campaignStatisticsModels.Click>;
  clickFilter: commonModels.Filter;
  clickMeta: commonModels.Meta;
  conversionFetching: boolean;
  conversionDidFetch: boolean;
  conversionData: Array<campaignStatisticsModels.Conversion>;
  conversionFilter: commonModels.Filter;
  conversionMeta: commonModels.Meta;
}

export const initialState: CampaignStatisticsState = {
  messageCountFetching: false,
  messageCountDidFetch: false,
  messageCount: {
    sent_count: 0,
    failed_count: 0,
    processing_failed_count: 0,
    filtered: []
  },
  carrierFetching: false,
  carrierDidFetch: false,
  carrierData: [],
  carrierFilter: {
    search: '',
    order_by: 'mobileclick',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  carrierMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  didFetching: false,
  didDidFetch: false,
  didData: [],
  didFilter: {
    search: '',
    order_by: 'mobileclickscount',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  didMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  messageTemplateFetching: false,
  messageTemplateDidFetch: false,
  messageTemplateData: [],
  messageTemplateFilter: {
    search: '',
    order_by: 'mobileclickscount',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  messageTemplateMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  tldFetching: false,
  tldDidFetch: false,
  tldData: [],
  tldFilter: {
    search: '',
    order_by: 'mobileclickscount',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  tldMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  messageSentFetching: false,
  messageSentDidFetch: false,
  messageSentData: [],
  messageSentFilter: {
    search: '',
    order_by: 'sent_at',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  messageSentMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  clickFetching: false,
  clickDidFetch: false,
  clickData: [],
  clickFilter: {
    search: '',
    order_by: 'clicked_at',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  clickMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  conversionFetching: false,
  conversionDidFetch: false,
  conversionData: [],
  conversionFilter: {
    search: '',
    order_by: 'received_at',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  conversionMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
};
