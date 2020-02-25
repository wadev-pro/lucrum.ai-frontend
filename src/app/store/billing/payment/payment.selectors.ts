import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from './payment.states';

export const name = 'payment';
export const paymentSelector = createFeatureSelector<PaymentState>(name);

export const didFetchSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.didFetch,
);

export const fetchingSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.fetching,
);

export const processingSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.processing,
);

export const dataSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.data,
);

export const createdSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.created,
);

export const filterSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.filter
);

export const metaSelector = createSelector(
  paymentSelector,
  (state: PaymentState) => state.meta
);

