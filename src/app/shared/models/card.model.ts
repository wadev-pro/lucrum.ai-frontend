export interface CardModel {
  id?: string,
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber?: string;
  expiresOn?: string;
  cvc?: string;
  token?: object;
  active?: boolean;
}