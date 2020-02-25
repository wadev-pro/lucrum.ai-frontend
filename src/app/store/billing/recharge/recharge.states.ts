import { RechargeModel } from 'app/shared/models/recharge.model';

export interface RechargeState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: RechargeModel;
}

export const initialState: RechargeState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: {
    active: false,
    fallonAmount: 0,
    rechargeAmount: 0,
    cardId: 0
  }
};
