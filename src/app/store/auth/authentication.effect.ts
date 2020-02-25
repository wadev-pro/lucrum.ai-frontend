import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

import { AUTH } from 'app/core/errors';
import { UpdateUser } from 'app/shared/models/user.model';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { AddError } from 'app/store/error/error.actions';
import { AppState } from '../index';
import * as routerActions from '../router/router.action';
import * as actions from './authentication.action';

@Injectable()
export class AuthenticationEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGIN),
    map(action => (action as actions.Login).payload),
    switchMap((payload: actions.LoginPayload) => {
      return from(this.authService.login(payload.email, payload.password)).pipe(
        map(result => {
          this.localStorageService.storeAuthorization(
            `${result.token_type} ${result.access_token}`
          );
          return new actions.LoginSuccessful(result);
        }),
        catchError(error => of(new actions.LoginFailed(error.message)))
      );
    })
  );

  @Effect()
  loginSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGIN_SUCCESFUL),
    debounceTime(300),
    map(action => (action as actions.LoginSuccessful).payload),
    switchMap((payload: actions.LoginSuccessfulPayload) => {
      this.localStorageService.storeAuthorization(
        `${payload.token_type} ${payload.access_token}`
      );
      return of(new actions.GetUserInfo());
    })
  );

  @Effect()
  getUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_USER_INFO),
    map(action => (action as actions.Login).payload),
    switchMap((payload: actions.LoginPayload) => {
      return from(this.authService.getUserInfo()).pipe(
        map(result => {
          let isLogin = false;
          if (!this.localStorageService.getData('identification')) {
            isLogin = true;
          }
          this.localStorageService.setData('identification', result.email);
          if (isLogin) {
            this.store.dispatch(new routerActions.Go({ path: ['dashboard'] }));
            this.authService.getActionApiAuthorization()
              .subscribe((res) => {
                if (res) {
                  this.localStorageService.storeActionApiAuthorization('Bearer ' + res);
                }
              });
            this.authService.getBillingAuthorization()
              .subscribe((res) => {
                if (res.auth) {
                  this.localStorageService.storeBillingAuthorization(res.token);
                }
              });
          }
          return new actions.GetUserInfoSuccessful(result);
        }),
        catchError(error => {
          return of(new actions.GetUserInfoFailed(error.message));
        })
      );
    })
  );

  @Effect()
  getUserInfoFailed$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_USER_INFO_FAILED),
    switchMap(() => {
      return of(new routerActions.Go({ path: ['sessions/logout'] }));
    })
  );

  @Effect()
  updateUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UPDATE_USER_INFO),
    map(action => (action as actions.UpdateUserInfo).payload),
    switchMap((payload: UpdateUser) => {
      return from(this.authService.updateUserInfo(payload)).pipe(
        map(result => {
          return new actions.UpdateUserInfoSuccessful(result['data']);
        }),
        catchError(error => {
          let errorMessage = AUTH.EDIT_ERROR;
          if (error['status'] === 422) {
            errorMessage = error['error']['message'];
          }
          this.store$.dispatch(
            new AddError({
              type: AUTH.TYPE,
              message: errorMessage,
            })
          );
          return of(new actions.UpdateUserInfoFailed(error.message));
        })
      );
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGOUT),
    switchMap(() => {
      return from(this.authService.logout()).pipe(
        map(() => {
          return new actions.LogoutSuccessful();
        })
      );
    })
  );

  @Effect()
  logoutSuccessful$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOGOUT_SUCCESSFUL),
    switchMap(() => {
      return of(new routerActions.Go({ path: ['sessions/logout'] }));
    })
  );
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store$: Store<AppState>
  ) {}
}
