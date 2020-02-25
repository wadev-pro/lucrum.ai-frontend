import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { MatSnackBar } from '@angular/material';
import { CAMPAIGN, CAMPAIGN_STATISTICS } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CampaignService } from '../../shared/services/apis/campaign.service';
import * as actions from './campaign.actions';

@Injectable()
export class CampaignEffects {
  @Effect()
  getStatistics$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_STATISTICS),
    map(action => (action as actions.GetStatistics).payload),
    switchMap(payload => {
      return from(this.service.getStatistics(payload.campaign_ids)).pipe(
        map(result => {
          return new actions.GetStatisticsSuccesful(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CAMPAIGN_STATISTICS.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_LIST),
    map(action => (action as actions.GetList).payload),
    switchMap(payload => {
      return from(this.service.getList(payload)).pipe(
        map(result => {
          return new actions.GetListSuccesful(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.LIST_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CAMPAIGN.LIST_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  startCampaign$: Observable<Action> = this.actions$.pipe(
    ofType(actions.START_CAMPAIGN),
    map(action => (action as actions.StartCampaign).payload),
    switchMap(payload => {
      return from(
        this.service.startCampaign(payload.campaign_id, payload)
      ).pipe(
        map(result => {
          return new actions.StartCampaignSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          this.store$.dispatch(new actions.StartCampaignFailed(payload));
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  testCampaign$: Observable<Action> = this.actions$.pipe(
    ofType(actions.TEST_CAMPAIGN),
    map(action => (action as actions.TestCampaign).payload),
    switchMap(payload => {
      return from(this.service.testCampaign(payload.campaign_id, payload)).pipe(
        map(result => {
          return new actions.TestCampaignSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          this.store$.dispatch(new actions.TestCampaignFailed(payload));
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  checkCampaign$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CHECK_CAMPAIGN),
    map(action => (action as actions.CheckCampaign).payload),
    switchMap(payload => {
      return from(this.service.checkCampaign(payload.campaign_id)).pipe(
        map(result => {
          return new actions.CheckCampaignSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          this.store$.dispatch(new actions.CheckCampaignFailed(payload));
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  stopCheckCampaign$: Observable<Action> = this.actions$.pipe(
    ofType(actions.STOP_CHECK_CAMPAIGN),
    map(action => (action as actions.StopCheckCampaign).payload),
    switchMap(payload => {
      return from(this.service.stopCheckCampaign(payload.campaign_id)).pipe(
        map(result => {
          return new actions.StopCheckCampaignSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          this.store$.dispatch(new actions.StopCheckCampaignFailed(payload));
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  stopCampaign$: Observable<Action> = this.actions$.pipe(
    ofType(actions.STOP_CAMPAIGN),
    map(action => (action as actions.StopCampaign).payload),
    switchMap(payload => {
      return from(this.service.stopCampaign(payload.campaign_id)).pipe(
        map(result => {
          const param = {
            campaign_id: payload.campaign_id,
          };
          this.store$.dispatch(new actions.MarkCampaignStopped(param));
          return new actions.StopCampaignSuccess(payload);
        }),
        catchError(err => {
          const param = {
            campaign_id: payload.campaign_id,
          };
          this.store$.dispatch(new actions.StopCampaignFailed(param));
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  markCampaignStopped$: Observable<Action> = this.actions$.pipe(
    ofType(actions.MARK_CAMPAIGN_STOPPED),
    map(action => (action as actions.MarkCampaignStopped).payload),
    switchMap(payload => {
      return from(this.service.markCampaignStopped(payload.campaign_id)).pipe(
        map(result => {
          return new actions.MarkCampaignStoppedSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(new actions.MarkCampaignStoppedFailed(payload));
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  deleteCampaignJob$: Observable<Action> = this.actions$.pipe(
    ofType(actions.DELETE_CAMPAIGN_JOB),
    map(action => (action as actions.DeleteCampaignJob).payload),
    switchMap(payload => {
      return from(this.service.deleteCampaignJob(payload.campaign_id)).pipe(
        map(result => {
          this.snack$.open('Campaign Job Deleted!', 'OK', {
            duration: 4000,
          });
          return new actions.DeleteCampaignJobSuccess(payload);
        }),
        catchError(err => {
          this.store$.dispatch(new actions.DeleteCampaignJobFailed(payload));
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.ACTION_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CAMPAIGN.ACTION_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: CampaignService,
    private store$: Store<AppState>,
    private snack$: MatSnackBar
  ) {}
}
