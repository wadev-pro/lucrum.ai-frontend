import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';
import {
  campaignIdSelector,
  fetchingSelector as detailFetchingSelector,
} from 'app/store/campaign-detail/campaign-detail.selectors';

import {
  carrierFetchingSelector,
  clickFetchingSelector,
  conversionFetchingSelector,
  didFetchingSelector,
  messageCountFetchingSelector,
  messageSentFetchingSelector,
  messageTemplateFetchingSelector,
  tldFetchingSelector,
} from 'app/store/campaign-statistics/campaign-statistics.selectors';
import { fetchingSelector as domainFetchingSelector } from 'app/store/domain-pool/domain-pool.selectors';
import { fetchingSelector as eventHistoryFetchingSelector } from 'app/store/event-history/event-history.selectors';

import {
  ClearDetail,
  UpdateCampaignId,
} from 'app/store/campaign-detail/campaign-detail.actions';
import { ClearDetail as CampaignStatisticsClearDetail } from 'app/store/campaign-statistics/campaign-statistics.actions';
import { ClearDetail as DomainPoolClearDetail } from 'app/store/domain-pool/domain-pool.actions';
import { ClearDetail as EventHistoryClearDetail } from 'app/store/event-history/event-history.actions';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.style.scss'],
  animations: egretAnimations,
})
export class CampaignDetailsComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public detailFetching$: Observable<any>;
  public eventHistoryFetching$: Observable<any>;
  public messageCountFetching$: Observable<any>;
  public carrierFetching$: Observable<any>;
  public didFetching$: Observable<any>;
  public messageTemplateFetching$: Observable<any>;
  public tldFetching$: Observable<any>;
  public messageSentFetching$: Observable<any>;
  public clickFetching$: Observable<any>;
  public domainsFetching$: Observable<any>;
  public conversionFetching$: Observable<any>;
  public campaign_id$: Observable<any>;

  public isFetching: boolean;
  public campaign_id: string;

  constructor(
    private store$: Store<AppState>,
    private route$: ActivatedRoute,
    private changeDetectorRefs$: ChangeDetectorRef
  ) {
    this.detailFetching$ = this.store$.select(detailFetchingSelector);
    this.eventHistoryFetching$ = this.store$.select(
      eventHistoryFetchingSelector
    );
    this.messageCountFetching$ = this.store$.select(
      messageCountFetchingSelector
    );
    this.carrierFetching$ = this.store$.select(carrierFetchingSelector);
    this.didFetching$ = this.store$.select(didFetchingSelector);
    this.messageTemplateFetching$ = this.store$.select(
      messageTemplateFetchingSelector
    );
    this.tldFetching$ = this.store$.select(tldFetchingSelector);
    this.messageSentFetching$ = this.store$.select(messageSentFetchingSelector);
    this.clickFetching$ = this.store$.select(clickFetchingSelector);
    this.domainsFetching$ = this.store$.select(domainFetchingSelector);
    this.conversionFetching$ = this.store$.select(conversionFetchingSelector);
    this.campaign_id$ = this.store$.select(campaignIdSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.isFetching = false;
    this.clearDetail();

    combineLatest(this.campaign_id$, this.route$.paramMap)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([campaign_id, params]) => {
        const new_campaign_id = params.get('campaign_id');
        if (campaign_id !== new_campaign_id) {
          this.store$.dispatch(new UpdateCampaignId(new_campaign_id));
        }
      });

    combineLatest(
      this.detailFetching$,
      this.eventHistoryFetching$,
      this.messageCountFetching$,
      this.carrierFetching$,
      this.didFetching$,
      this.messageTemplateFetching$,
      this.tldFetching$,
      this.messageSentFetching$,
      this.domainsFetching$,
      this.clickFetching$,
      this.conversionFetching$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        ([
          detailFetching,
          eventHistoryFetching,
          messageCountFetching,
          carrierFetching,
          didFetching,
          messageTemplateFetching,
          tldFetching,
          messageSentFetching,
          domainsFetching,
          clickFetching,
          conversionFetching,
        ]) => {
          this.isFetching =
            detailFetching ||
            eventHistoryFetching ||
            messageCountFetching ||
            carrierFetching ||
            didFetching ||
            messageTemplateFetching ||
            tldFetching ||
            messageSentFetching ||
            domainsFetching ||
            clickFetching ||
            conversionFetching;
          this.changeDetectorRefs$.detectChanges();
        }
      );
  }

  clearDetail() {
    this.store$.dispatch(new ClearDetail());
    this.store$.dispatch(new DomainPoolClearDetail());
    this.store$.dispatch(new EventHistoryClearDetail());
    this.store$.dispatch(new CampaignStatisticsClearDetail());
  }
}
