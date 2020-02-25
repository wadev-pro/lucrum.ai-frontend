import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { UPLOAD_STATUS } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DidUploadService } from '../../shared/services/apis/did-upload.service';
import * as actions from './uploader-status.actions';

@Injectable()
export class UploaderStatusEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(() => {
      return from(this.service.getAllUploaderStatus()).pipe(
        map(result => {
          return new actions.GetListSuccesful(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: UPLOAD_STATUS.TYPE,
              message: UPLOAD_STATUS.LIST_ERROR,
            })
          );
          return of(
            new actions.GetListFailed({
              error: UPLOAD_STATUS.LIST_ERROR,
            })
          );
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private service: DidUploadService,
    private store$: Store<AppState>
  ) {}
}
