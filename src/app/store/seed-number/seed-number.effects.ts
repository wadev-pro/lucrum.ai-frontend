import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material';
import { SEED_NUMBER } from 'app/core/errors';
import { SeedNumber } from 'app/shared/models/seed-number.model';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { SeedNumberService } from '../../shared/services/apis/seed-number.service';
import * as actions from './seed-number.actions';

@Injectable()
export class SeedNumberEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(() => {
      return from(this.service$.getList()).pipe(
        map(result => {
          return new actions.GetListSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: SEED_NUMBER.TYPE,
              message: SEED_NUMBER.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: SEED_NUMBER.LIST_ERROR,
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
        map((result: SeedNumber) => {
          this.snack$.open('Seed Number Added!', 'OK', {
            duration: 4000,
          });
          return new actions.CreateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: SEED_NUMBER.TYPE,
              message: SEED_NUMBER.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: SEED_NUMBER.ADD_ERROR,
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
      return from(this.service$.delete(payload)).pipe(
        map((result: SeedNumber) => {
          this.snack$.open('Seed Number Deleted!', 'OK', {
            duration: 4000,
          });
          this.snack$.open('Seed Number Deleted!', 'OK', {
            duration: 4000,
          });
          return new actions.DeleteSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: SEED_NUMBER.TYPE,
              message: SEED_NUMBER.DELETE_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: SEED_NUMBER.DELETE_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: SeedNumberService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
