import { Action } from '@ngrx/store';
import { RechargeModel } from '../../../shared/models/recharge.model';

export enum RechargeActionTypes {
  LOAD = '@lc/recharge/load',
  LOAD_SUCCESS = '@lc/recharge/load-success',
  LOAD_FAILURE = '@lc/recharge/load-failure',
  CREATE = '@lc/recharge/create',
  CREATE_SUCCESS = '@lc/recharge/create-success',
  CREATE_FAILURE = '@lc/recharge/create-failure',
  ADD_ERROR = '@lc/user/add-error'
}

export class Load implements Action {
  readonly type = RechargeActionTypes.LOAD;
  constructor(public payload: any) {}
}

export class LoadSuccess implements Action {
  readonly type = RechargeActionTypes.LOAD_SUCCESS;
  constructor(public payload: RechargeModel) {}
}

export class LoadFailure implements Action {
  readonly type = RechargeActionTypes.LOAD_FAILURE;
  constructor(public payload: any) {}
}

export class Create implements Action {
  readonly type  = RechargeActionTypes.CREATE;
  constructor (public payload: RechargeModel) {}
}

export class CreateSuccess implements Action {
  readonly type = RechargeActionTypes.CREATE_SUCCESS;
  constructor(public payload: RechargeModel) {}
}

export class CreateFailure implements Action {
  readonly type = RechargeActionTypes.CREATE_FAILURE;
  constructor(public payload: any) {}
}

export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = RechargeActionTypes.ADD_ERROR;
  constructor(public payload: AddErrorPayload) {}
}

export type Actions =
  | Load
  | LoadSuccess
  | LoadFailure
  | Create
  | CreateSuccess
  | CreateFailure
  | AddError
