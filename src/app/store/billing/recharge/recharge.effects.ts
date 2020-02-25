import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { RECHARGE } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '../../index';
import { RechargeService } from '../../../shared/services/apis/recharge.service';
import * as actions from './recharge.actions';

@Injectable()
export class RechargeEffects {
  @Effect()
  load: Observable<Action> = this.actions$.pipe(
    ofType(actions.RechargeActionTypes.LOAD),
    map(action => (action as actions.Load).payload),
    switchMap(() => {
      return from(this.service$.load()).pipe(
        map(result => {
          return new actions.LoadSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: RECHARGE.TYPE,
              message: RECHARGE.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: RECHARGE.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(actions.RechargeActionTypes.CREATE),
    map(action => (action as actions.Create).payload),
    switchMap(payload => {
      return from(this.service$.create(payload)).pipe(
        map(result => {
          this.snack$.open('Payment method added successfully!', 'OK', {
            duration: 4000,
          });
          return new actions.CreateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: RECHARGE.TYPE,
              message: RECHARGE.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: RECHARGE.ADD_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: RechargeService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
