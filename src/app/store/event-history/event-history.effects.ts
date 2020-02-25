import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { EVENT_HISTORY } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CampaignService } from '../../shared/services/apis/campaign.service';
import * as actions from './event-history.actions';

@Injectable()
export class EventHistoryEffects {
  @Effect()
  getEventHistory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    map(action => (action as actions.GetList).payload),
    switchMap(payload => {
      return from(this.service$.getEventHistory(payload.campaign_id)).pipe(
        map(result => {
          return new actions.GetListSuccesful(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: EVENT_HISTORY.TYPE,
              message: EVENT_HISTORY.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: EVENT_HISTORY.LIST_ERROR,
            })
          );
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private service$: CampaignService,
    private store$: Store<AppState>
  ) {}
}
