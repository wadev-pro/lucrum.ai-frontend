import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { CAMPAIGN, DID_POOL, MESSAGE_TEMPLATE_GROUP } from 'app/core/errors';
import { AddError } from 'app/store/error/error.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { CampaignService } from '../../shared/services/apis/campaign.service';
import { DidPoolService } from '../../shared/services/apis/did-pool.service';
import { MessageTemplateGroupService } from '../../shared/services/apis/message-template-group.service';
import * as didPoolActions from '../did-pool/did-pool.actions';
import * as templateGroupActions from '../message-template-group/message-template-group.actions';
import * as actions from './campaign-detail.actions';

@Injectable()
export class CampaignDetailEffects {
  @Effect()
  getDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_DETAIL),
    map(action => (action as actions.GetDetail).payload),
    switchMap(payload => {
      return from(this.service$.getDetail(payload.campaign_id)).pipe(
        map(result => {
          this.store$.dispatch(
            new actions.GetDidPool({
              id: result.didPoolId,
            })
          );
          this.store$.dispatch(
            new actions.GetMessageTemplateGroup({
              id: result.messageTemplateGroupId,
            })
          );
          return new actions.GetDetailSuccesful(result);
        }),
        catchError(() => {
          return of(new actions.GetDetailDb(payload));
        })
      );
    })
  );

  @Effect()
  getDetailDb$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_DETAIL_DB),
    map(action => (action as actions.GetDetailDb).payload),
    switchMap(payload => {
      return from(this.service$.getDetailDb(payload.campaign_id)).pipe(
        map(result => {
          return new actions.GetDetailSuccesful(result.data);
        }),
        catchError(() => {
          this.store$.dispatch(
            new AddError({
              type: CAMPAIGN.TYPE,
              message: CAMPAIGN.GET_ERROR,
            })
          );
          return of(
            new actions.AddError({
              error: CAMPAIGN.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getDidPool$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_DID_POOL),
    map(action => (action as actions.GetDidPool).payload),
    switchMap(payload => {
      return from(this.didServivce$.getById(payload.id)).pipe(
        map(result => {
          return new actions.UpdateDetail({
            didPool: result,
          });
        }),
        catchError(() => {
          this.store$.dispatch(
            new AddError({
              type: DID_POOL.TYPE,
              message: DID_POOL.GET_ERROR,
            })
          );
          return of(
            new didPoolActions.AddError({
              error: DID_POOL.GET_ERROR,
            })
          );
        })
      );
    })
  );

  @Effect()
  getMessageTemplateGroup$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_MESSAGE_TEMPLATE_GROUP),
    map(action => (action as actions.GetMessageTemplateGroup).payload),
    switchMap(payload => {
      return from(this.messageTemplateGroupService$.getById(payload.id)).pipe(
        map(result => {
          return new actions.UpdateDetail({
            messageTemplateGroup: result,
          });
        }),
        catchError(() => {
          this.store$.dispatch(
            new AddError({
              type: MESSAGE_TEMPLATE_GROUP.TYPE,
              message: MESSAGE_TEMPLATE_GROUP.GET_ERROR,
            })
          );
          return of(
            new templateGroupActions.AddError({
              error: MESSAGE_TEMPLATE_GROUP.GET_ERROR,
            })
          );
        })
      );
    })
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private service$: CampaignService,
    private didServivce$: DidPoolService,
    private messageTemplateGroupService$: MessageTemplateGroupService
  ) {}
}
