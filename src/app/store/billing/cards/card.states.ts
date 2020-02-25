import { CardModel } from 'app/shared/models/card.model';

export interface CardState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<CardModel>;
}

export const initialState: CardState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: []
};
