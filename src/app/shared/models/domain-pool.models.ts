import { Filter, Meta } from './common.model';
export interface DomainPool {
  no: number;
  domain: string;
}

export interface DomainPoolResponse {
  data: Array<DomainPool>;
  filter: Filter;
  meta: Meta;
}
