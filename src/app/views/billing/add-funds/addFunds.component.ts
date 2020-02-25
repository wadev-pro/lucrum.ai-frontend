import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as cardActions from 'app/store/billing/cards/card.actions';
import * as paymentActions from 'app/store/billing/payment/payment.actions';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'app/store/';
import { dataSelector, didFetchSelector, fetchingSelector } from 'app/store/billing/cards/card.selectors';
import { createdSelector } from 'app/store/billing/payment/payment.selectors';
import { CardModel } from 'app/shared/models/card.model';
import { PaymentModel } from 'app/shared/models/payment.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface CardDetails {
  ending: string,
  expire: string,
  owner: string,
  active?: boolean
}
@Component({
  selector: 'add-funds',
  templateUrl: './addFunds.component.html',
  styleUrls: ['./addFunds.component.css'],
})
export class AddFundsComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  public didFetch$: Observable<any>;
  public created$: Observable<any>;
  public fetching$: Observable<any>;
  public userCards$: Observable<any>;
  public userCards: Array<CardModel>;
  firstFormGroup;
  secondFormGroup;
  selectedCard: CardModel = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiresOn: '',
    cvc: ''
  };
  selectedRadio;
  packages: string[] = ['100.00', '200.00', '500.00', '1000.00', '2000.00'];
  cards = [];
  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder) {
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.created$ = this.store$.select(createdSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
    this.userCards$ = this.store$.select(dataSelector);
    this.firstFormGroup = this.formBuilder.group({
      amount: ['500.00'],
      customAmount: 0
    });
    this.secondFormGroup = this.formBuilder.group({
      /*cvc: new FormControl('', [Validators.required, Validators.maxLength(5)]),*/
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
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
    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();
    this.created$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(created => {
          // Add logic here if the created is successful
        })
      )
      .subscribe();
  }

  loadData() {
    this.store$.dispatch(new cardActions.Load({}));
  }

  onRowClicked (card) {
    this.selectedCard = { ...card, active: true };

  }

  saveCard() {
    const pricingValue  = this.firstFormGroup.value;
    const cvc = this.secondFormGroup.value.cvc;
    const amount = pricingValue.amount === -1 ? pricingValue.customAmount: pricingValue.amount;
    const cardId = this.selectedCard.id;

    this.store$.dispatch(new paymentActions.Create(<any>{
      cvc,
      amount,
      cardId
    }));
  }
}
