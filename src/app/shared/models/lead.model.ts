export interface NumberInfo {
  carrierName: string;
  isMobileCarrier: boolean;
  isBlackListed: boolean;
  blackListedType: string;
  country: string;
  isNumberValid: boolean;
  responseTime: string;
  npa: string;
  nxx: string;
  isSuccess: boolean;
  status: string;
}

export interface PersonInfo {
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Lastname?: string;
}

export interface CarrierInfo {
  carrier: string;
  isMobileCarrier: boolean;
  country: string;
}

export interface LeadInfo {
  personInfo: PersonInfo;
  carrierInfo: CarrierInfo;
  createdAt: string;
  lastUpdateAt: string;
  isCreated: boolean;
  isBlacklisted: boolean;
  blacklistedType: string;
  blacklistedAt: string;
}

export interface Statistics {
  clickCount: number;
  sentMessageCount: number;
  receivedMessageCount: number;
  payoutCount: number;
  firstMessageSentAt: string;
  lastMessageSentAt: string;
  firstMessageReceivedAt: string;
  lastMessageReceivedAt: string;
  optInAt: string;
  optOutAt: string;
  firstReplyReceivedAt: string;
  lastReplyAt: string;
  lastReceivedMessageClassificationType: string;
  firstComplainReceivedAt: string;
  lastComplainReceivedAt: string;
  firstClickReceivedAt: string;
  lastClickReceivedAt: string;
  firstPayoutAt: string;
  lastPayoutAt: string;
  totalPayoutAmount: number;
  firstPayoutAmount: number;
  lastPayoutAmount: number;
  lowestPayoutAmount: number;
  highestPayoutAmount: number;
}

export interface Lead {
  leadInfo: LeadInfo;
  statistics: Statistics;
}

export const initialNumberInfo: NumberInfo = {
  carrierName: 'n/a',
  isMobileCarrier: null,
  isBlackListed: null,
  blackListedType: 'n/a',
  country: 'n/a',
  isNumberValid: null,
  responseTime: 'n/a',
  npa: 'n/a',
  nxx: 'n/a',
  isSuccess: null,
  status: 'n/a',
};

export const initialLead: Lead = {
  leadInfo: {
    personInfo: {
      FirstName: 'n/a',
      LastName: 'n/a',
      Phone: 'n/a',
      City: 'n/a',
      State: 'n/a',
      Zip: 'n/a',
      Lastname: 'n/a',
    },
    carrierInfo: {
      carrier: 'n/a',
      isMobileCarrier: null,
      country: 'n/a',
    },
    createdAt: null,
    lastUpdateAt: null,
    isCreated: null,
    isBlacklisted: null,
    blacklistedType: 'n/a',
    blacklistedAt: null,
  },
  statistics: {
    clickCount: 0,
    sentMessageCount: 0,
    receivedMessageCount: 0,
    payoutCount: 0,
    firstMessageSentAt: null,
    lastMessageSentAt: null,
    firstMessageReceivedAt: null,
    lastMessageReceivedAt: null,
    optInAt: null,
    optOutAt: null,
    firstReplyReceivedAt: null,
    lastReplyAt: null,
    lastReceivedMessageClassificationType: 'n/a',
    firstComplainReceivedAt: null,
    lastComplainReceivedAt: null,
    firstClickReceivedAt: null,
    lastClickReceivedAt: null,
    firstPayoutAt: null,
    lastPayoutAt: null,
    totalPayoutAmount: 0,
    firstPayoutAmount: 0,
    lastPayoutAmount: 0,
    lowestPayoutAmount: 0,
    highestPayoutAmount: 0,
  },
};
