import { Link, Meta } from './common.model';

export interface LeadFilter {
  vertical?: string;
  fileowner?: string;
  carrier?: string;
  eventtype?: number;
  state?: string;
  city?: string;
}

export interface Filter {
  start_date: string;
  end_date: string;
  filter: LeadFilter;
  page?: number;
  per_page?: number;
}

export interface Lead {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
}

export interface LeadResponse {
  data: Array<Lead>;
  meta: Meta;
  link: Link;
}

export interface ReportStatus {
  id: string;
  user_id: string;
  type: string;
  filter: string;
  filename: string;
  status: string;
  completed_at: string;
  log: string;
  created_at: string;
  updated_at: string;
}
