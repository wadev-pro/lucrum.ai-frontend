import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { CARD } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '../../index';
import { CardService } from '../../../shared/services/apis/card.service';
import * as actions from './card.actions';

@Injectable()
export class CardEffects {
  @Effect()
  load: Observable<Action> = this.actions$.pipe(
    ofType(actions.CardActionTypes.LOAD),
    map(action => (action as actions.Load).payload),
    switchMap(() => {
      return from(this.service$.load()).pipe(
        map(result => {
          return new actions.LoadSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CARD.TYPE,
              message: CARD.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CARD.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CardActionTypes.CREATE),
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
              type: CARD.TYPE,
              message: CARD.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CARD.ADD_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: CardService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
