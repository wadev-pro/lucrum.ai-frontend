import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as rechargeActions from 'app/store/billing/recharge/recharge.actions';
import * as cardActions from 'app/store/billing/cards/card.actions';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'app/store';
import {
  dataSelector as rechargeDataSelector,
  didFetchSelector as rechargeDidFetchSelector,
  fetchingSelector as rechargeFetchingSelector
} from 'app/store/billing/recharge/recharge.selectors';
import {
  dataSelector as cardDataSelector,
  didFetchSelector as cardDidFetchSelector,
  fetchingSelector as cardFetchingSelector
} from 'app/store/billing/cards/card.selectors';
import { RechargeModel } from 'app/shared/models/recharge.model';
import { CardModel } from '../../../shared/models/card.model';

@Component({
  selector: 'auto-recharge',
  templateUrl: './autoRecharge.component.html',
  styleUrls: ['./autoRecharge.component.css'],
})
export class AutoRechargeComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  public cardDidFetch$: Observable<any>;
  public cardFetching$: Observable<any>;
  public userCards$: Observable<any>;
  public userCards: Array<CardModel>;
  public rechargeDidFetch$: Observable<any>;
  public rechargeFetching$: Observable<any>;
  public rechargeSettings$: Observable<any>;
  public rechargeSettings: RechargeModel;
  autoRechargeForm: FormGroup;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder) {
    this.cardDidFetch$ = this.store$.select(cardDidFetchSelector);
    this.cardFetching$ = this.store$.select(cardFetchingSelector);
    this.userCards$ = this.store$.select(cardDataSelector);
    this.rechargeDidFetch$ = this.store$.select(rechargeDidFetchSelector);
    this.rechargeFetching$ = this.store$.select(rechargeFetchingSelector);
    this.rechargeSettings$ = this.store$.select(rechargeDataSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.autoRechargeForm = new FormGroup({
      fallonAmount: new FormControl(0),
      active: new FormControl(false),
      rechargeAmount: new FormControl(0),
      cardId: new FormControl('')
    });

    this.initCardData();
    this.initRechargeData();
  }

  initCardData() {
    this.userCards$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(userCards => {
          if (userCards && !deepEqual(this.userCards, userCards)) {
            this.userCards = userCards;
          }
        })
      )
      .subscribe();
    this.cardDidFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();
  }
  initRechargeData() {
    this.rechargeSettings$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(settings => {
          if (settings && !deepEqual(this.rechargeSettings, settings)) {
            this.rechargeSettings = settings;
            this.autoRechargeForm.patchValue(this.rechargeSettings);
          }
        })
      )
      .subscribe();
    this.rechargeDidFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadRechargeData())
      )
      .subscribe();
  }

  loadRechargeData () {
    this.store$.dispatch(new rechargeActions.Load({}));
  }
  loadData() {
    this.store$.dispatch(new cardActions.Load({}));
  }

  saveSettings(formValue) {
    this.store$.dispatch(new rechargeActions.Create(<RechargeModel>formValue));
  }
}
