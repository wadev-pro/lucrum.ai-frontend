import * as commonModels from 'app/shared/models/common.model';
import * as messageTemplateModels from 'app/shared/models/message-template-group.model';
import * as statisticsModels from 'app/shared/models/statistics.model';
import * as moment from 'moment-timezone';

const start_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 00:00:00'),
  end_date = moment()
    .tz('UTC')
    .format('YYYY-MM-DD 23:59:59');

export interface StatisticsState {
  tldFetching: boolean;
  tldDidFetch: boolean;
  tldData: Array<statisticsModels.Tld>;
  tldFilter: statisticsModels.TldFilter;
  tldMeta: commonModels.Meta;
  templateGroupFetching: boolean;
  templateGroupDidFetch: boolean;
  templateGroupData: Array<statisticsModels.TemplateGroup>;
  templateGroupFilter: statisticsModels.TemplateGrouplStatisticsFilter;
  templateGroupMeta: commonModels.Meta;
  templateGroupListFetching: boolean;
  templateGroupListDidFetch: boolean;
  templateGroupListData: Array<messageTemplateModels.MessageTemplateGroup>;
  templateGroupListFilter: commonModels.Filter;
  templateGroupListMeta: commonModels.Meta;
}

export const initialState: StatisticsState = {
  tldFetching: false,
  tldDidFetch: false,
  tldData: [],
  tldFilter: {
    start_date,
    end_date,
    search: '',
    order_by: 'mobileclick',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
    levels: ['All TLDs']
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
  templateGroupFetching: false,
  templateGroupDidFetch: false,
  templateGroupData: [],
  templateGroupFilter: {
    group_id: null,
    start_date,
    end_date,
    search: '',
    order_by: 'name',
    order_dir: 'asc',
    page: 1,
    per_page: 10,
  },
  templateGroupMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
  templateGroupListFetching: false,
  templateGroupListDidFetch: false,
  templateGroupListData: [],
  templateGroupListFilter: {
    search: '',
    order_by: 'createdAt',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  templateGroupListMeta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
};
