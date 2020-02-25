import * as campaignModels from 'app/shared/models/campaign.model';
import * as moment from 'moment-timezone';

const start_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 00:00:00'),
  end_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 23:59:59');

export interface CampaignState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  statisticsFetching: boolean;
  statisticsDidFetch: boolean;
  filter: campaignModels.CampaignFilter;
  data: Array<campaignModels.Campaign>;
  meta: campaignModels.CampaignMeta;
  links: campaignModels.CampaignLink;
}

export const initialState: CampaignState = {
  didFetch: false,
  fetching: false,
  processing: false,
  statisticsFetching: false,
  statisticsDidFetch: false,
  filter: {
    start_date: start_date,
    end_date: end_date,
    search: '',
    order_by: 'created_at',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  data: [],
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  links: {
    first: null,
    last: null,
    prev: null,
    next: null,
  },
};
