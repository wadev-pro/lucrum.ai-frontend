import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { REPORTS } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { ReportsService } from '../../shared/services/apis/reports.service';
import * as actions from './report.actions';

@Injectable()
export class ReportsEffects {
  @Effect()
  getLead$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LEAD),
    map(action => (action as actions.GetLead).payload),
    switchMap(payload => {
      return from(this.service$.getLeadReport(payload.filter)).pipe(
        map(result => {
          return new actions.GetLeadSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: REPORTS.TYPE,
              message: REPORTS.LEAD_ERROR,
            })
          );
          return of(
            new actions.GetLeadFailed({
              error: REPORTS.LEAD_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: ReportsService,
    private store$: Store<AppState>
  ) {}
}
