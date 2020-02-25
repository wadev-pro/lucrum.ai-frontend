import { Link, Meta, Filter } from './common.model';

export interface Tld {
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

export interface TldFilter extends Filter {
  levels: Array<string>;
}

export interface Tempate {
  id: string;
  name: string;
  created_at: string;
}

export interface TemplateGroup {
  no: number;
  template: Tempate;
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

export interface TemplateGroupResponse {
  data: Array<TemplateGroup>;
  meta: Meta;
  link: Link;
}

export interface TemplateGrouplStatisticsFilter {
  group_id: string;
  start_date: string;
  end_date: string;
  search: string;
  order_by: string;
  order_dir: string;
  page: number;
  per_page: number;
}
