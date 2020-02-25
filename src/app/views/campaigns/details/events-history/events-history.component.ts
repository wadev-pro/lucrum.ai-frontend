import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { EventHistory } from 'app/shared/models/event-history.model';
import { AppState } from 'app/store/';
import { GetList } from 'app/store/event-history/event-history.actions';
import * as deepEqual from 'deep-equal';

import {
  dataSelector,
  didFetchSelector,
} from 'app/store/event-history/event-history.selectors';

import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';

@Component({
  selector: 'app-campaign-details-events-history',
  templateUrl: './events-history.component.html',
  styleUrls: ['./events-history.style.scss'],
  animations: egretAnimations,
})
export class EventsHistoryComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public didFetch$: Observable<any>;
  public eventHistory$: Observable<any>;
  public campaignId$: Observable<any>;
  public step = null;

  campaign_id: string;
  eventHistories: Array<EventHistory> = [];

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef
  ) {
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.eventHistory$ = this.store$.select(dataSelector);
    this.campaignId$ = this.store$.select(campaignIdSelector);
  }

  ngOnInit() {
    this.campaignId$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaign_id => {
          if (this.campaign_id !== campaign_id) {
            this.campaign_id = campaign_id;
            this.initData();
          }
        })
      )
      .subscribe();

    this.eventHistory$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(data => {
          if (!deepEqual(this.eventHistories, data)) {
            this.eventHistories = data;
            this.changeDetectorRefs$.detectChanges();
          }
        })
      )
      .subscribe();
  }

  initData() {
    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(
          didFetch =>
            !didFetch &&
            this.store$.dispatch(
              new GetList({
                campaign_id: this.campaign_id,
              })
            )
        )
      )
      .subscribe();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
