export interface Statistics {
  sentcount: number;
  mobileclickscount: number;
  otherclickscount: number;
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ctr: number;
  opt_rate: number;
  complainer_rate: number;
  reply_rate: number;
}

export interface DashboardFilter {
  start_date: string;
  end_date: string;
  daterange: string;
}
