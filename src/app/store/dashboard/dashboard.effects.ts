import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { DASHBOARD_STATISTICS } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardService } from '../../shared/services/apis/dashboard.service';
import * as actions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  @Effect()
  getStatistics$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_STATISTICS),
    map(action => (action as actions.GetStatistics).payload),
    switchMap(payload => {
      return from(
        this.service$.getStatistics(payload.start_date, payload.end_date)
      ).pipe(
        map(result => {
          return new actions.GetStatisticsSuccesful(result.data);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: DASHBOARD_STATISTICS.TYPE,
              message: DASHBOARD_STATISTICS.LIST_ERROR,
            })
          );
          return of(
            new actions.GetStatisticsFailed({
              error: DASHBOARD_STATISTICS.LIST_ERROR,
            })
          );
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private service$: DashboardService
  ) {}
}
