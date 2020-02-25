import { Filter, Link, Meta } from './common.model';

export interface Profile {
  authorization?: string;
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  stripe_id: string;
  card_brand: string;
  card_last_four: string;
  trial_ends_at: string;
}

export interface UpdateUser {
  name: string;
  first_name: string;
  last_name: string;
  password?: string;
  password_confirmation?: string;
  withLinkPrice?: number;
  withoutLinkPrice?: number;
  userRouteFee?: number;
  didPrice?: number;
}

export interface User {
  id?: number;
  name: string;
  password?: string;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  created_at?: string;
  updated_at?: string;
  mtMessageWithLinkPrice?: number;
  mtMessageWithoutLinkPrice?: number;
  mtUserRouteFee?: number;
  didPrice?: number;
  balance?: number;
}

export interface UserResonse {
  data: Array<User>;
  links: Link;
  meta: Meta;
}
