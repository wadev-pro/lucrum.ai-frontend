import { Action } from '@ngrx/store';
import { PaymentModel, PaymentResonse } from 'app/shared/models/payment.model';
import * as commonModels from '../../../shared/models/common.model';

export enum PaymentActionTypes {
  LOAD = '@lc/payment/load',
  LOAD_SUCCESS = '@lc/payment/load-success',
  LOAD_FAILURE = '@lc/payment/load-failure',
  LOAD_BALANCE = '@lc/payment/load-balance',
  LOAD_BALANCE_SUCCESS = '@lc/payment/load-balance-success',
  LOAD_BALANCE_FAILURE = '@lc/payment/load-balance-failure',
  UPDATE_BALANCE = '@lc/payment/update-balance',
  UPDATE_BALANCE_SUCCESS = '@lc/payment/update-balance-success',
  UPDATE_BALANCE_FAILURE = '@lc/payment/update-balance-failure',
  UPDATE_PRICING = '@lc/payment/update-pricing',
  UPDATE_PRICING_SUCCESS = '@lc/payment/update-pricing-success',
  UPDATE_PRICING_FAILURE = '@lc/payment/update-pricing-failure',
  CREATE = '@lc/payment/create',
  CREATE_SUCCESS = '@lc/payment/create-success',
  CREATE_FAILURE = '@lc/payment/create-failure',
  ADD_ERROR = '@lc/payment/add-error',
  GET_LIST = '@lc/payment/get-list',
  GET_LIST_SUCCESS = '@lc/payment/get-list-success',
  UPDATE_FILTER = '@lc/payment/update-filter'
}

export class GetList implements Action {
  readonly type = PaymentActionTypes.GET_LIST;
  constructor(public payload: commonModels.Filter) {}
}

export class GetListSuccess implements Action {
  readonly type = PaymentActionTypes.GET_LIST_SUCCESS;
  constructor(public payload: PaymentResonse) {}
}

export class Load implements Action {
  readonly type = PaymentActionTypes.LOAD;
  constructor(public payload: any) {}
}

export class LoadSuccess implements Action {
  readonly type = PaymentActionTypes.LOAD_SUCCESS;
  constructor(public payload: PaymentModel) {}
}

export class LoadFailure implements Action {
  readonly type = PaymentActionTypes.LOAD_FAILURE;
  constructor(public payload: any) {}
}

export class LoadBalance implements Action {
  readonly type = PaymentActionTypes.LOAD_BALANCE;
  constructor() {}
}

export class LoadBalanceSuccess implements Action {
  readonly type = PaymentActionTypes.LOAD_BALANCE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadBalanceFailure implements Action {
  readonly type = PaymentActionTypes.LOAD_BALANCE_FAILURE;
  constructor(public payload: any) {}
}

export class Create implements Action {
  readonly type  = PaymentActionTypes.CREATE;
  constructor (public payload: PaymentModel) {}
}

export class CreateSuccess implements Action {
  readonly type = PaymentActionTypes.CREATE_SUCCESS;
  constructor(public payload: PaymentModel) {}
}

export class CreateFailure implements Action {
  readonly type = PaymentActionTypes.CREATE_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateBalance implements Action {
  readonly type = PaymentActionTypes.UPDATE_BALANCE;
  constructor(public payload: any) {}
}

export class UpdateBalanceSuccess implements Action {
  readonly type = PaymentActionTypes.UPDATE_BALANCE_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateBalanceFailure implements Action {
  readonly type = PaymentActionTypes.UPDATE_BALANCE_FAILURE;
  constructor(public payload: any) {}
}

export class UpdatePricing implements Action {
  readonly type = PaymentActionTypes.UPDATE_PRICING;
  constructor(public payload: any) {}
}

export class UpdatePricingSuccess implements Action {
  readonly type = PaymentActionTypes.UPDATE_PRICING_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdatePricingFailure implements Action {
  readonly type = PaymentActionTypes.UPDATE_PRICING_FAILURE;
  constructor(public payload: any) {}
}

export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = PaymentActionTypes.ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}

export class UpdateFilter implements Action {
  readonly type = PaymentActionTypes.UPDATE_FILTER;
  constructor(public payload: object) {}
}

export const UPDATE_META = '@lc/payment/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor(public payload: object) {}
}

export type Actions =
  | GetList
  | GetListSuccess
  | Load
  | LoadSuccess
  | LoadFailure
  | LoadBalance
  | LoadBalanceSuccess
  | LoadBalanceFailure
  | UpdateBalance
  | UpdateBalanceSuccess
  | UpdateBalanceFailure
  | UpdatePricing
  | UpdatePricingSuccess
  | UpdatePricingFailure
  | Create
  | CreateSuccess
  | CreateFailure
  | UpdateFilter
  | UpdateMeta
  | AddError
