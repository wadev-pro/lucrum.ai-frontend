import { Link, Meta } from './common.model';

export interface PaymentModel {
  id: string;
  date: string;
  amount: number;
  status: string;
  method: string;
  description: string;
}

export interface PaymentResonse {
  data: Array<PaymentModel>;
  links: Link;
  meta: Meta;
}

