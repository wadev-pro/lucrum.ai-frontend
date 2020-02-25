import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RechargeState } from './recharge.states';

export const name = 'recharge';
export const rechargeSelector = createFeatureSelector<RechargeState>(name);

export const didFetchSelector = createSelector(
  rechargeSelector,
  (state: RechargeState) => state.didFetch,
);

export const fetchingSelector = createSelector(
  rechargeSelector,
  (state: RechargeState) => state.fetching,
);

export const processingSelector = createSelector(
  rechargeSelector,
  (state: RechargeState) => state.processing,
);

export const dataSelector = createSelector(
  rechargeSelector,
  (state: RechargeState) => state.data,
);
