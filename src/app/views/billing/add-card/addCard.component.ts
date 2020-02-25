import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as actions from 'app/store/billing/cards/card.actions';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'app/store';
import { dataSelector, didFetchSelector, fetchingSelector } from 'app/store/billing/cards/card.selectors';
import { CardModel } from 'app/shared/models/card.model';
import { ElementOptions, ElementsOptions, StripeCardComponent, StripeService, Element, Elements } from 'ngx-stripe';

@Component({
  selector: 'add-card',
  templateUrl: './addCard.component.html',
  styleUrls: ['./addCard.component.css'],
})
export class AddCardComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  private onDestroy$ = new Subject<void>();
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public userCardDetails$: Observable<any>;
  public userCardDetails: CardModel;

  addCardForm: FormGroup;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#ffffff',
        color: '#ffffff',
        lineHeight: '40px',
        fontWeight: 300,
        // fontSize: '16px',
        '::placeholder': {
          color: '#ffffff',
        },
      },
    },
  };

  elementsOptions: ElementsOptions = {
    locale: 'en',
  };

  elementStyles = {
    base: {
      color: '#ffffff',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#f44336',

      '::placeholder': {
        color: 'rgba(50,43,48,0.58)',
      },
    },
  };
  cardNumber: any;
  stripe: any;

  elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  };

  constructor(
    private store$: Store<AppState>,
    private stripeService: StripeService,) {
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
    this.userCardDetails$ = this.store$.select(dataSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.addCardForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
    this.stripe = window['Stripe']('pk_test_I76aJlT9M1En5ZiWviiE8bJZ00uOvdfsYs');
    const elements = this.stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
        },
      ],
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: 'en'
    });
    const inputs = document.querySelectorAll('.cell.stripe-element .input');

    Array.prototype.forEach.call(inputs, function(input) {
      input.addEventListener('focus', function() {
        input.classList.add('focused');
      });
      input.addEventListener('blur', function() {
        input.classList.remove('focused');
      });
      input.addEventListener('keyup', function() {
        if (input.value.length === 0) {
          input.classList.add('empty');
        } else {
          input.classList.remove('empty');
        }
      });
    });
    this.cardNumber = elements.create('cardNumber', {
      style: this.elementStyles,
      classes: this.elementClasses,
    });
    this.cardNumber.mount('#stripe-element-card-number');

    const cardExpiry = elements.create('cardExpiry', {
      style: this.elementStyles,
      classes: this.elementClasses,
    });
    cardExpiry.mount('#stripe-element-card-expiry');

    const cardCvc = elements.create('cardCvc', {
      style: this.elementStyles,
      classes: this.elementClasses,
    });
    cardCvc.mount('#stripe-element-card-cvc');
  }

  initData() {
    this.userCardDetails$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(userCardDetails => {
          if (userCardDetails && !deepEqual(this.userCardDetails, userCardDetails)) {
            this.userCardDetails = userCardDetails;
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
  }

  loadData() {
    this.store$.dispatch(new actions.Load({}));
  }

  addCard () {

    const { name, address, city, state, zip } = this.addCardForm.value;

    const additionalData = {
      name: name,
      address_line1: address,
      address_city: city,
      address_state: state,
      address_zip: zip,
    };

    this.stripe.createToken(this.cardNumber, additionalData).then((result) => {
      if (result.token) {
        const payload: any = {
          ...this.addCardForm.value, token: result.token
        };
        this.store$.dispatch(new actions.Create(payload));
      } else if (result.error) {
        console.log(result.error.message);
      }
    });
  }
}
