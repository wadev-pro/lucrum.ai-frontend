import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { GATEWAY_PROVIDER } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MessageGatewayProviderService } from '../../shared/services/apis/message-gateway-provider.service';
import * as actions from './gateway-provider.actions';

@Injectable()
export class GatewayProviderEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(() => {
      return from(this.service.getList()).pipe(
        map(result => {
          return new actions.GetListSuccesful(result.messageGatewayProviders);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: GATEWAY_PROVIDER.TYPE,
              message: GATEWAY_PROVIDER.LIST_ERROR,
            })
          );
          return of(
            new actions.GetListFailed({
              error: GATEWAY_PROVIDER.LIST_ERROR,
            })
          );
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private service: MessageGatewayProviderService,
    private store$: Store<AppState>
  ) {}
}
