import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { DOMAIN_POOL } from 'app/core/errors';
import { formatResposne } from 'app/shared/helpers/api.helper';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '..';
import { DomainPoolService } from '../../shared/services/apis/domain-pool.service';
import * as actions from './domain-pool.actions';

@Injectable()
export class DomainPoolEffects {
  @Effect()
  getDomains$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    map(action => (action as actions.GetList).payload),
    switchMap(payload => {
      return from(this.service$.getList(payload.campaign_id)).pipe(
        map(result => {
          const domains = result.domains || [];
          return new actions.GetListSuccess(domains);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DOMAIN_POOL.TYPE,
              message: DOMAIN_POOL.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DOMAIN_POOL.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  addDomain$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ADD_DOMAIN),
    map(action => (action as actions.AddDomain).payload),
    switchMap(payload => {
      return from(
        this.service$.addDomains(payload.campaign_id, payload.domain)
      ).pipe(
        map(result => {
          this.snack$.open('Domain Added!', 'OK', { duration: 4000 });
          this.store$.dispatch(new actions.ClearDetail());
          return new actions.AddDomainSuccess();
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DOMAIN_POOL.TYPE,
              message: DOMAIN_POOL.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DOMAIN_POOL.ADD_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  editDomain$: Observable<Action> = this.actions$.pipe(
    ofType(actions.EDIT_DOMAIN),
    map(action => (action as actions.EditDomain).payload),
    switchMap(payload => {
      return from(
        this.service$.editDomain(
          payload.campaign_id,
          payload.index,
          payload.domain
        )
      ).pipe(
        map(result => {
          this.snack$.open('Domain Edited!', 'OK', { duration: 4000 });
          const successPayload: actions.EditDomainSuccessPayload = {
            index: payload.index,
            domain: payload.domain,
          };
          return new actions.EditDomainSuccess(successPayload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DOMAIN_POOL.TYPE,
              message: DOMAIN_POOL.EDIT_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DOMAIN_POOL.EDIT_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  deleteDomain$: Observable<Action> = this.actions$.pipe(
    ofType(actions.DELETE_DOMAIN),
    map(action => (action as actions.DeleteDomain).payload),
    switchMap(payload => {
      return from(
        this.service$.deleteDomains(payload.campaign_id, payload.id)
      ).pipe(
        map(result => {
          this.snack$.open('Domain Deleted!', 'OK', { duration: 4000 });
          this.store$.dispatch(new actions.ClearDetail());
          return new actions.DeleteDomainSuccess();
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DOMAIN_POOL.TYPE,
              message: DOMAIN_POOL.DELETE_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: DOMAIN_POOL.DELETE_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: DomainPoolService,
    private store$: Store<AppState>,
    private snack$: MatSnackBar
  ) {}
}
