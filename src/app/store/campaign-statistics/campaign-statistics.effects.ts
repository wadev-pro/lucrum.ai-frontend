import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'app/store/index';

import { CAMPAIGN_STATISTICS } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CampaignService } from '../../shared/services/apis/campaign.service';
import * as actions from './campaign-statistics.actions';

@Injectable()
export class CampaignStatisticsEffects {
  @Effect()
  getMessageCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_MESSAGE_COUNT),
    map(action => (action as actions.GetMessageCount).payload),
    switchMap(payload => {
      return from(this.service$.getMessageCount(payload.campaign_id)).pipe(
        map(result => {
          return new actions.GetMessageCountSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.MESSAGE_COUNT_ERROR,
            })
          );
          return of(
            new actions.GetMessageCountFailed({
              error: CAMPAIGN_STATISTICS.MESSAGE_COUNT_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getCarrier$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_CARRIER),
    map(action => (action as actions.GetCarrier).payload),
    switchMap(payload => {
      return from(
        this.service$.getCarrierStatistics(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetCarrierSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.CARRIER_ERROR,
            })
          );
          return of(
            new actions.GetCarrierFailed({
              error: CAMPAIGN_STATISTICS.CARRIER_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getDid$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_DID),
    map(action => (action as actions.GetDid).payload),
    switchMap(payload => {
      return from(
        this.service$.getDidStatistics(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetDidSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.DID_ERROR,
            })
          );
          return of(
            new actions.GetDidFailed({
              error: CAMPAIGN_STATISTICS.DID_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getMessageTemplate$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_MESSAGE_TEMPLATE),
    map(action => (action as actions.GetMessageTemplate).payload),
    switchMap(payload => {
      return from(
        this.service$.getMessageTemplate(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetMessageTemplateSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.MESSAGE_TEMPLATE_ERROR,
            })
          );
          return of(
            new actions.GetMessageTemplateFailed({
              error: CAMPAIGN_STATISTICS.MESSAGE_TEMPLATE_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getTld$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_TLD),
    map(action => (action as actions.GetTld).payload),
    switchMap(payload => {
      return from(
        this.service$.getTld(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetTldSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.TLDE_ERROR,
            })
          );
          return of(
            new actions.GetTldFailed({
              error: CAMPAIGN_STATISTICS.TLDE_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getMessageSent$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_MESSAGE_SENT),
    map(action => (action as actions.GetMessageSent).payload),
    switchMap(payload => {
      return from(
        this.service$.getMessageSent(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetMessageSentSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.MESSAGE_SENT_ERROR,
            })
          );
          return of(
            new actions.GetMessageSentFailed({
              error: CAMPAIGN_STATISTICS.MESSAGE_SENT_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getClick$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_CLICK),
    map(action => (action as actions.GetClick).payload),
    switchMap(payload => {
      return from(
        this.service$.getClick(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetClickSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.CLICK_ERROR,
            })
          );
          return of(
            new actions.GetClickFailed({
              error: CAMPAIGN_STATISTICS.CLICK_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getConversion$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_CONVERSION),
    map(action => (action as actions.GetConversion).payload),
    switchMap(payload => {
      return from(
        this.service$.getConversion(payload.campaign_id, payload.filter)
      ).pipe(
        map(result => {
          return new actions.GetConversionSuccess(result);
        }),
        catchError(err => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN_STATISTICS.TYPE,
              message: CAMPAIGN_STATISTICS.CONVERSION_ERROR,
            })
          );
          return of(
            new actions.GetConversionFailed({
              error: CAMPAIGN_STATISTICS.CONVERSION_ERROR,
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
