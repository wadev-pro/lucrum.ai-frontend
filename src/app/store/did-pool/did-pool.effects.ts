import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material';
import { DID_POOL, SEED_NUMBER } from 'app/core/errors';
import * as commonModels from 'app/shared/models/common.model';
import { DidPool, DidPoolResponse } from 'app/shared/models/did-pool.model';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { DidPoolService } from '../../shared/services/apis/did-pool.service';
import * as actions from './did-pool.actions';

@Injectable()
export class DidPoolEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(() => {
      return from(this.service$.getList()).pipe(
        map((result: DidPoolResponse) => {
          const { items: items } = result;
          return new actions.GetListSuccess({
            items,
          });
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DID_POOL.TYPE,
              message: DID_POOL.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DID_POOL.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CREATE),
    map(action => (action as actions.Create).payload),
    switchMap(payload => {
      return from(this.service$.create(payload)).pipe(
        map((result: DidPool) => {
          this.snack$.open('DID Pool Added!', 'OK', { duration: 4000 });
          return new actions.CreateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DID_POOL.TYPE,
              message: DID_POOL.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DID_POOL.ADD_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UPDATE),
    map(action => (action as actions.Update).payload),
    switchMap(payload => {
      return from(this.service$.update(payload)).pipe(
        map((result: DidPool) => {
          this.snack$.open('DID Pool Edited!', 'OK', { duration: 4000 });
          return new actions.UpdateSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DID_POOL.TYPE,
              message: DID_POOL.EDIT_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DID_POOL.EDIT_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: DidPoolService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
