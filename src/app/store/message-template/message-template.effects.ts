import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material';
import { MESSAGE_TEMPLATE } from 'app/core/errors';
import * as commonModels from 'app/shared/models/common.model';
import {
  MessageTemplate,
  MessageTemplateResponse,
} from 'app/shared/models/message-template.model';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { MessageTemplateService } from '../../shared/services/apis/message-template.service';
import * as actions from './message-template.actions';

@Injectable()
export class MessageTemplateEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(payload => {
      return from(this.service$.getList()).pipe(
        map(result => {
          return new actions.GetListSuccess({
            data: result,
          });
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: MESSAGE_TEMPLATE.TYPE,
              message: MESSAGE_TEMPLATE.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: MESSAGE_TEMPLATE.LIST_ERROR,
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
        map((result: MessageTemplate) => {
          this.snack$.open('Message Template Added!', 'OK', { duration: 4000 });
          return new actions.CreateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: MESSAGE_TEMPLATE.TYPE,
              message: MESSAGE_TEMPLATE.ADD_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: MESSAGE_TEMPLATE.ADD_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  edit$: Observable<Action> = this.actions$.pipe(
    ofType(actions.UPDATE),
    map(action => (action as actions.Update).payload),
    switchMap(payload => {
      return from(this.service$.update(payload)).pipe(
        map((result: MessageTemplate) => {
          this.snack$.open('Message Template Edited!', 'OK', {
            duration: 4000,
          });
          return new actions.UpdateSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: MESSAGE_TEMPLATE.TYPE,
              message: MESSAGE_TEMPLATE.EDIT_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: MESSAGE_TEMPLATE.EDIT_ERROR,
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
      return from(this.service$.delete(payload.templateId)).pipe(
        map(result => {
          this.snack$.open('Message Template Deleted!', 'OK', {
            duration: 4000,
          });
          return new actions.DeleteSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: MESSAGE_TEMPLATE.TYPE,
              message: MESSAGE_TEMPLATE.DELETE_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: MESSAGE_TEMPLATE.DELETE_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: MessageTemplateService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
