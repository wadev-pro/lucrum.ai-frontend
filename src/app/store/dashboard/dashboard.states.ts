import * as dashboardModels from 'app/shared/models/dashboard.model';
import * as moment from 'moment-timezone';

const start_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 00:00:00'),
  end_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 23:59:59');

export interface DashboardState {
  fetching: boolean;
  didFetch: boolean;
  filter: dashboardModels.DashboardFilter;
  data: dashboardModels.Statistics;
}

export const initialFilter = {
  daterange: 'today',
  start_date: start_date,
  end_date: end_date,
};

export const initialState: DashboardState = {
  didFetch: false,
  fetching: false,
  filter: initialFilter,
  data: {
    sentcount: 0,
    mobileclickscount: 0,
    otherclickscount: 0,
    cost: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
    ctr: 0,
    opt_rate: 0,
    complainer_rate: 0,
    reply_rate: 0,
  },
};
