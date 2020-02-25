import * as moment from 'moment-timezone';

const startDateFormat = 'YYYY-MM-DD 00:00:00';
const endDateFormat = 'YYYY-MM-DD 23:59:59';

export const DASHBOARD_DATES = [
  {
    display: 'Today',
    name: 'today',
    value: {
      start_date: moment()
        .tz('UTC')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .format(endDateFormat),
    },
  },
  {
    display: 'Yesterday',
    name: 'yesterday',
    value: {
      start_date: moment()
        .tz('UTC')
        .subtract(1, 'day')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .subtract(1, 'day')
        .format(endDateFormat),
    },
  },
  {
    display: 'Last 3 Days',
    name: 'last-three',
    value: {
      start_date: moment()
        .tz('UTC')
        .subtract(3, 'day')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .subtract(1, 'day')
        .format(endDateFormat),
    },
  },
  {
    display: 'Last 7 Days',
    name: 'last-seven',
    value: {
      start_date: moment()
        .tz('UTC')
        .subtract(7, 'day')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .subtract(1, 'day')
        .format(endDateFormat),
    },
  },
  {
    display: 'Last Week',
    name: 'last-week',
    value: {
      start_date: moment()
        .tz('UTC')
        .subtract(1, 'week')
        .startOf('week')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .subtract(1, 'week')
        .endOf('week')
        .format(endDateFormat),
    },
  },
  {
    display: 'This Month',
    name: 'this-month',
    value: {
      start_date: moment()
        .tz('UTC')
        .startOf('month')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .endOf('month')
        .format(endDateFormat),
    },
  },
  {
    display: 'Last Month',
    name: 'last-month',
    value: {
      start_date: moment()
        .tz('UTC')
        .subtract(1, 'month')
        .startOf('month')
        .format(startDateFormat),
      end_date: moment()
        .tz('UTC')
        .subtract(1, 'month')
        .endOf('month')
        .format(endDateFormat),
    },
  },
];

export const AVAILABLE_TAGS = [
  {
    name: 'firstname',
    value: '[[FirstName]]',
  },
  {
    name: 'lastname',
    value: '[[LastName]]',
  },
  {
    name: 'city',
    value: '[[City]]',
  },
  {
    name: 'state',
    value: '[[State]]',
  },
  {
    name: 'link',
    value: '[[LINK]]',
  },
  {
    name: 'day',
    value: '[[Day]]',
  },
  {
    name: 'date',
    value: '[[Date]]',
  },
];

export const CURRENCIES = [
  {
    name: 'EURO',
    value: 'EURO',
  },
  {
    name: 'USD',
    value: 'USD',
  },
];

export const CARRIER_BLACK_LIST = [
  {
    name: 'attt',
    label: 'AT&T',
  },
  {
    name: 'sprint',
    label: 'SPRINT',
  },
  {
    name: 't-mobile',
    label: 'T-Mobile',
  },
  {
    name: 'verizon',
    label: 'Verizon',
  },
];

export const FILTER_EVENT_TYPES = [
  {
    name: '  - SELECT  -  ',
    value: null,
  },
  {
    name: 'Clickers',
    value: '1',
  },
  {
    name: 'Clickers(not converted yet)',
    value: '2',
  },
  {
    name: 'Converters',
    value: '3',
  },
];

export const STATE_LIST = [
  {
    label: '  - SELECT  -  ',
    id: null,
  },
  {
    label: 'Alabama',
    id: 'AL',
  },
  {
    label: 'Alaska',
    id: 'AK',
  },
  {
    label: 'American Samoa',
    id: 'AS',
  },
  {
    label: 'Arizona',
    id: 'AZ',
  },
  {
    label: 'Arkansas',
    id: 'AR',
  },
  {
    label: 'California',
    id: 'CA',
  },
  {
    label: 'Colorado',
    id: 'CO',
  },
  {
    label: 'Connecticut',
    id: 'CT',
  },
  {
    label: 'Delaware',
    id: 'DE',
  },
  {
    label: 'District Of Columbia',
    id: 'DC',
  },
  {
    label: 'Federated States Of Micronesia',
    id: 'FM',
  },
  {
    label: 'Florida',
    id: 'FL',
  },
  {
    label: 'Georgia',
    id: 'GA',
  },
  {
    label: 'Guam',
    id: 'GU',
  },
  {
    label: 'Hawaii',
    id: 'HI',
  },
  {
    label: 'Idaho',
    id: 'ID',
  },
  {
    label: 'Illinois',
    id: 'IL',
  },
  {
    label: 'Indiana',
    id: 'IN',
  },
  {
    label: 'Iowa',
    id: 'IA',
  },
  {
    label: 'Kansas',
    id: 'KS',
  },
  {
    label: 'Kentucky',
    id: 'KY',
  },
  {
    label: 'Louisiana',
    id: 'LA',
  },
  {
    label: 'Maine',
    id: 'ME',
  },
  {
    label: 'Marshall Islands',
    id: 'MH',
  },
  {
    label: 'Maryland',
    id: 'MD',
  },
  {
    label: 'Massachusetts',
    id: 'MA',
  },
  {
    label: 'Michigan',
    id: 'MI',
  },
  {
    label: 'Minnesota',
    id: 'MN',
  },
  {
    label: 'Mississippi',
    id: 'MS',
  },
  {
    label: 'Missouri',
    id: 'MO',
  },
  {
    label: 'Montana',
    id: 'MT',
  },
  {
    label: 'Nebraska',
    id: 'NE',
  },
  {
    label: 'Nevada',
    id: 'NV',
  },
  {
    label: 'New Hampshire',
    id: 'NH',
  },
  {
    label: 'New Jersey',
    id: 'NJ',
  },
  {
    label: 'New Mexico',
    id: 'NM',
  },
  {
    label: 'New York',
    id: 'NY',
  },
  {
    label: 'North Carolina',
    id: 'NC',
  },
  {
    label: 'North Dakota',
    id: 'ND',
  },
  {
    label: 'Northern Mariana Islands',
    id: 'MP',
  },
  {
    label: 'Ohio',
    id: 'OH',
  },
  {
    label: 'Oklahoma',
    id: 'OK',
  },
  {
    label: 'Oregon',
    id: 'OR',
  },
  {
    label: 'Palau',
    id: 'PW',
  },
  {
    label: 'Pennsylvania',
    id: 'PA',
  },
  {
    label: 'Puerto Rico',
    id: 'PR',
  },
  {
    label: 'Rhode Island',
    id: 'RI',
  },
  {
    label: 'South Carolina',
    id: 'SC',
  },
  {
    label: 'South Dakota',
    id: 'SD',
  },
  {
    label: 'Tennessee',
    id: 'TN',
  },
  {
    label: 'Texas',
    id: 'TX',
  },
  {
    label: 'Utah',
    id: 'UT',
  },
  {
    label: 'Vermont',
    id: 'VT',
  },
  {
    label: 'Virgin Islands',
    id: 'VI',
  },
  {
    label: 'Virginia',
    id: 'VA',
  },
  {
    label: 'Washington',
    id: 'WA',
  },
  {
    label: 'West Virginia',
    id: 'WV',
  },
  {
    label: 'Wisconsin',
    id: 'WI',
  },
  {
    label: 'Wyoming',
    id: 'WY',
  },
];
