import { Action } from '@ngrx/store';
import { CardModel } from '../../../shared/models/card.model';

export enum CardActionTypes {
  LOAD = '@lc/card/load',
  LOAD_SUCCESS = '@lc/card/load-success',
  LOAD_FAILURE = '@lc/card/load-failure',
  CREATE = '@lc/card/create',
  CREATE_SUCCESS = '@lc/card/create-success',
  CREATE_FAILURE = '@lc/card/create-failure',
  ADD_ERROR = '@lc/card/add-error'
}

export class Load implements Action {
  readonly type = CardActionTypes.LOAD;
  constructor(public payload: any) {}
}

export class LoadSuccess implements Action {
  readonly type = CardActionTypes.LOAD_SUCCESS;
  constructor(public payload: Array<CardModel>) {}
}

export class LoadFailure implements Action {
  readonly type = CardActionTypes.LOAD_FAILURE;
  constructor(public payload: any) {}
}

export class Create implements Action {
  readonly type  = CardActionTypes.CREATE;
  constructor (public payload: CardModel) {}
}

export class CreateSuccess implements Action {
  readonly type = CardActionTypes.CREATE_SUCCESS;
  constructor(public payload: CardModel) {}
}

export class CreateFailure implements Action {
  readonly type = CardActionTypes.CREATE_FAILURE;
  constructor(public payload: any) {}
}

export interface AddErrorPayload {
  error: string;
}
export class AddError implements Action {
  readonly type = CardActionTypes.ADD_ERROR;
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
