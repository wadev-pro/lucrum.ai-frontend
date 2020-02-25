import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { PROCESSING_STATUS } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProcessStatusService } from '../../shared/services/apis/process-status.service';
import * as actions from './process-status.actions';

@Injectable()
export class ProcessStatusEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(() => {
      return from(this.service.getList()).pipe(
        map(result => {
          return new actions.GetListSuccesful(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: PROCESSING_STATUS.TYPE,
              message: PROCESSING_STATUS.LIST_ERROR,
            })
          );
          return of(
            new actions.GetListFailed({
              error: PROCESSING_STATUS.LIST_ERROR,
            })
          );
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private service: ProcessStatusService,
    private store$: Store<AppState>
  ) {}
}
