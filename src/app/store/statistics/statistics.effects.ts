import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { STATISTICS } from 'app/core/errors';
import * as commonModels from 'app/shared/models/common.model';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { MessageTemplateGroupService } from '../../shared/services/apis/message-template-group.service';
import { StatisticsService } from '../../shared/services/apis/statistics.service';
import * as actions from './statistics.actions';

@Injectable()
export class StatisticsEffects {
  @Effect()
  getTld$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_TLD),
    map(action => (action as actions.GetTld).payload),
    switchMap(payload => {
      return from(this.service$.getTldStatistics(payload.filter)).pipe(
        map(result => {
          return new actions.GetTldSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: STATISTICS.TYPE,
              message: STATISTICS.TLD_ERROR,
            })
          );
          return of(
            new actions.GetTldFailed({
              error: STATISTICS.TLD_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getTemplateGroup$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_TEMPLATE_GROUP),
    map(action => (action as actions.GetTemplateGroup).payload),
    switchMap(payload => {
      return from(
        this.service$.getTemplateGroupStatistics(payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetTemplateGroupSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: STATISTICS.TYPE,
              message: STATISTICS.TEMPlATE_GROUP_ERROR,
            })
          );
          return of(
            new actions.GetTemplateGroupFailed({
              error: STATISTICS.TEMPlATE_GROUP_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getTemplateGroupList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_TEMPLATE_GROUP_LIST),
    switchMap(() => {
      return from(this.messageTemplateService$.getList()).pipe(
        map(result => {
          return new actions.GetTemplateGroupListSuccess({
            data: result,
          });
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: STATISTICS.TYPE,
              message: STATISTICS.TEMPlATE_GROUP_LIST,
            })
          );
          return of(
            new actions.GetTemplateGroupListFailed({
              error: STATISTICS.TEMPlATE_GROUP_LIST,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: StatisticsService,
    private messageTemplateService$: MessageTemplateGroupService,
    private store$: Store<AppState>
  ) {}
}
