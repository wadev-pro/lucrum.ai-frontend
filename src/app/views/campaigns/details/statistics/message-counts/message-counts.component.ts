import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as CampaignStatisticsModel from 'app/shared/models/campaign-statistics.models';
import { AppState } from 'app/store/';
import * as CampaignStatisticsActions from 'app/store/campaign-statistics/campaign-statistics.actions';

import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';
import {
  messageCountDidFetchSelector,
  messageCountSelector
} from 'app/store/campaign-statistics/campaign-statistics.selectors';

@Component({
  selector: 'app-campaign-details-statistics-message-counts',
  templateUrl: './message-counts.component.html',
  styleUrls: ['./message-counts.style.scss'],
  animations: egretAnimations,
})
export class MessageCountsComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  campaignId$: Observable<any>;
  messageCountDidFetch$: Observable<any>;
  messageCount$: Observable<any>;

  campaign_id: string;
  messageCount: CampaignStatisticsModel.MessageCount;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.messageCountDidFetch$ = this.store$.select(
      messageCountDidFetchSelector
    );
    this.messageCount$ = this.store$.select(messageCountSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.campaignId$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaign_id => {
          this.campaign_id = campaign_id;
          this.initData();
        })
      )
      .subscribe();

    this.messageCount$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(messageCount => {
          if (!deepEqual(this.messageCount, messageCount)) {
            this.messageCount = messageCount;
          }
        })
      )
      .subscribe();
  }

  initData() {
    this.messageCountDidFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(
          didFetch =>
            !didFetch &&
            this.store$.dispatch(
              new CampaignStatisticsActions.GetMessageCount({
                campaign_id: this.campaign_id,
              })
            )
        )
      )
      .subscribe();
  }

  public getLabelFromKey (key) {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); });
  }
}
