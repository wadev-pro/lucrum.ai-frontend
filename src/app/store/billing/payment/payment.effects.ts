import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { PAYMENT } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '../../index';
import { PaymentService } from 'app/shared/services/apis/payment.service';
import * as actions from './payment.actions';

@Injectable()
export class PaymentEffects {
  @Effect()
  load: Observable<Action> = this.actions$.pipe(
    ofType(actions.PaymentActionTypes.LOAD),
    map(action => (action as actions.Load).payload),
    switchMap(() => {
      return from(this.service$.load()).pipe(
        map(result => {
          return new actions.LoadSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: PAYMENT.TYPE,
              message: PAYMENT.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: PAYMENT.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  loadBalance: Observable<Action> = this.actions$.pipe(
    ofType(actions.PaymentActionTypes.LOAD_BALANCE),
    map(action => (action as actions.LoadBalance)),
    switchMap(() => {
      return from(this.service$.loadBalance()).pipe(
        map(result => {
          return new actions.LoadBalanceSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: PAYMENT.TYPE,
              message: PAYMENT.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: PAYMENT.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.PaymentActionTypes.GET_LIST || actions.PaymentActionTypes.UPDATE_FILTER),
    map(action => (action as actions.GetList).payload),
    switchMap(payload => {
      return from(this.service$.getList(payload)).pipe(
        map(result => {
          return new actions.GetListSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: PAYMENT.TYPE,
              message: PAYMENT.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: PAYMENT.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType(actions.PaymentActionTypes.CREATE),
    map(action => (action as actions.Create).payload),
    switchMap(payload => {
      return from(this.service$.create(payload)).pipe(
        map(result => {
          this.snack$.open('Payment was successful!', 'OK', {
            duration: 4000,
          });
          return new actions.CreateSuccess(result);
        }),
        catchError(err => {
          const message = err && err.error && err.error.message ? err.error.message : null;

          this.store$.dispatch(
            new actions.CreateFailure(err)
          );
          this.store$.dispatch(
            new AddError({
              type: PAYMENT.TYPE,
              message: message || PAYMENT.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: PAYMENT.ADD_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  updateBalance: Observable<Action> = this.actions$.pipe(
    ofType(actions.PaymentActionTypes.UPDATE_BALANCE),
    map(action => (action as actions.UpdateBalance)),
    switchMap((payload) => {
      return from(this.service$.updateBalance(<any>payload)).pipe(
        map(result => {
          return new actions.UpdateBalanceSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: PAYMENT.TYPE,
              message: PAYMENT.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: PAYMENT.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  updatePricing: Observable<Action> = this.actions$.pipe(
    ofType(actions.PaymentActionTypes.UPDATE_PRICING),
    map(action => (action as actions.UpdatePricing)),
    switchMap((payload) => {
      return from(this.service$.updatePricing(<any>payload)).pipe(
        map(result => {
          return new actions.UpdatePricingSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: PAYMENT.TYPE,
              message: PAYMENT.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: PAYMENT.GET_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: PaymentService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
