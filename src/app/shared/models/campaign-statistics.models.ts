import { Link, Meta } from './common.model';

export interface MessageCount {
  sent_count: number;
  failed_count: number;
  processing_failed_count: number;
  filtered: Array<MessageFilteredCount>
}

export interface MessageFilteredCount {
  id: number;
  count: number;
  label: string;
}

export interface Carrier {
  no: number;
  carrier: string;
  sentcount: number;
  mobileclickscount: number;
  otherclickscount: number;
  conversioncount: number;
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ctr: number;
  opt_rate: number;
  complainer_rate: number;
  reply_rate: number;
}

export interface CarrierResponse {
  data: Array<Carrier>;
  meta: Meta;
  link: Link;
}

export interface Did {
  no: number;
  did: string;
  sentcount: number;
  mobileclickscount: number;
  otherclickscount: number;
  conversioncount: number;
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ctr: number;
  opt_rate: number;
  complainer_rate: number;
  reply_rate: number;
}

export interface DidResponse {
  data: Array<Did>;
  meta: Meta;
  link: Link;
}

export interface MessageTemplate {
  no: number;
  templatename: string;
  messagetemplateid: string;
  sentcount: number;
  mobileclickscount: number;
  otherclickscount: number;
  conversioncount: number;
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ctr: number;
  opt_rate: number;
  complainer_rate: number;
  reply_rate: number;
}

export interface MessageTemplateResponse {
  data: Array<MessageTemplate>;
  meta: Meta;
  link: Link;
}

export interface Tld {
  no: number;
  tld: string;
  sentcount: number;
  mobileclickscount: number;
  otherclickscount: number;
  conversioncount: number;
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ctr: number;
  opt_rate: number;
  complainer_rate: number;
  reply_rate: number;
}

export interface TldResponse {
  data: Array<Tld>;
  meta: Meta;
  link: Link;
}

export interface MessageCarrier {
  carrier?: string;
  isMobileCarrier?: boolean;
  country?: string;
}

export interface Lead {
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  City?: string;
  State?: string;
  Zip?: string;
}

export interface MessageSent {
  carrier: MessageCarrier;
  crafted_message: string;
  did: string;
  did_pool: string;
  lead: Lead;
  sent_at: string;
  template: string;
  template_group: string;
  to: string;
}

export interface MessageSentResponse {
  data: Array<MessageSent>;
  meta: Meta;
  link: Link;
}

export interface Click {
  carrier: MessageCarrier;
  crafted_message: string;
  did: string;
  did_pool: string;
  lead: Lead;
  clicked_at: string;
  device: string;
  redirect_url: string;
  template: string;
  to: string;
}

export interface ClickResponse {
  data: Array<Click>;
  meta: Meta;
  link: Link;
}

export interface Conversion {
  carrier: MessageCarrier;
  crafted_message: string;
  did: string;
  did_pool: string;
  lead: Lead;
  received_at: string;
  device: object;
  redirect_url: string;
  template: string;
  to: string;
  amount: number;
}

export interface ConversionResponse {
  data: Array<Conversion>;
  meta: Meta;
  link: Link;
}
