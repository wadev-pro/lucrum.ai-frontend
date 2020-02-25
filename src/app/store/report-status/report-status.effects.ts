import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material';
import { REPORT_STATUS } from 'app/core/errors';
import { ReportStatus } from 'app/shared/models/reports.model';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { ReportsService } from '../../shared/services/apis/reports.service';
import * as actions from './report-status.actions';

@Injectable()
export class ReportStatusEffects {
  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    switchMap(() => {
      return from(this.service$.getStatusList()).pipe(
        map(result => {
          return new actions.GetListSuccess(result['data']);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: REPORT_STATUS.TYPE,
              message: REPORT_STATUS.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: REPORT_STATUS.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service$: ReportsService,
    private snack$: MatSnackBar,
    private store$: Store<AppState>
  ) {}
}
