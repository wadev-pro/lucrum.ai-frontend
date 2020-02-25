import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { DIDS } from 'app/core/errors';
import * as commonModels from 'app/shared/models/common.model';
import { Did, DidResponse } from 'app/shared/models/dids.model';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { DidsService } from '../../shared/services/apis/dids.service';
import * as actions from './did.actions';

@Injectable()
export class DidEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    map(action => (action as actions.GetList).payload),
    switchMap(payload => {
      return from(
        this.service$.getList(payload.did_pool_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetListSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DIDS.TYPE,
              message: DIDS.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DIDS.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  activate$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ACTIVATE),
    map(action => (action as actions.Activate).payload),
    switchMap(payload => {
      return from(this.service$.activate(payload.id)).pipe(
        map(result => {
          return new actions.ActivateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DIDS.TYPE,
              message: DIDS.ACTIVATE_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DIDS.ACTIVATE_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  deactivate$: Observable<Action> = this.actions$.pipe(
    ofType(actions.DEACTIVATE),
    map(action => (action as actions.Deactivate).payload),
    switchMap(payload => {
      return from(this.service$.deactivate(payload.id)).pipe(
        map(result => {
          return new actions.DeactivateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DIDS.TYPE,
              message: DIDS.DEACTIVATE_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DIDS.DEACTIVATE_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(actions.DELETE),
    map(action => (action as actions.Delete).payload),
    switchMap(payload => {
      return from(this.service$.delete(payload.id)).pipe(
        map(result => {
          return new actions.DeleteSuccess();
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DIDS.TYPE,
              message: DIDS.DELETE_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DIDS.DELETE_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: DidsService,
    private store$: Store<AppState>
  ) {}
}
