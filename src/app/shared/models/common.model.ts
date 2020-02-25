export interface ErrorObj {
  type: string;
  message: string;
}

export interface TablePagination {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

export interface FileTags {
  additionalProp1?: string;
  additionalProp2?: string;
  additionalProp3?: string;
}

export interface Link {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Filter {
  start_date?: string;
  end_date?: string;
  search?: string;
  order_by?: string;
  order_dir?: string;
  page: number;
  per_page: number;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Paging {
  currentRecordsCount: number;
  maxRecords: number;
  skippedRecords: number;
}
