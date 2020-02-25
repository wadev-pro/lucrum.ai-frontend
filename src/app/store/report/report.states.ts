import * as commonModels from 'app/shared/models/common.model';
import * as reportsModels from 'app/shared/models/reports.model';
import * as moment from 'moment-timezone';

const start_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 00:00:00'),
  end_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 23:59:59');

export interface ReportsState {
  leadFetching: boolean;
  leadDidFetch: boolean;
  leadData: Array<reportsModels.Lead>;
  leadFilter: reportsModels.Filter;
  leadMeta: commonModels.Meta;
}

export const initialState: ReportsState = {
  leadFetching: false,
  leadDidFetch: true,
  leadData: [],
  leadFilter: {
    start_date,
    end_date,
    filter: {},
    page: 1,
    per_page: 10,
  },
  leadMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
};
