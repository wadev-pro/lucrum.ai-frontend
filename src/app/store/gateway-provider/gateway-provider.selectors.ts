import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GatewayProviderState } from './gateway-provider.states';

export const name = 'gatewayProvider';
export const gatewayProviderSelector = createFeatureSelector<
  GatewayProviderState
>(name);

export const didFetchSelector = createSelector(
  gatewayProviderSelector,
  (state: GatewayProviderState) => state.didFetch
);

export const fetchingSelector = createSelector(
  gatewayProviderSelector,
  (state: GatewayProviderState) => state.fetching
);

export const dataSelector = createSelector(
  gatewayProviderSelector,
  (state: GatewayProviderState) => state.data
);
