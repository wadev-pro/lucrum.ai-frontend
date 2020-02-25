import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UploaderStatusState } from './uploader-status.states';

export const name = 'uploaderStatus';
export const uploaderStatusSelector = createFeatureSelector<
  UploaderStatusState
>(name);

export const didFetchSelector = createSelector(
  uploaderStatusSelector,
  (state: UploaderStatusState) => state.didFetch
);

export const fetchingSelector = createSelector(
  uploaderStatusSelector,
  (state: UploaderStatusState) => state.fetching
);

export const dataSelector = createSelector(
  uploaderStatusSelector,
  (state: UploaderStatusState) => state.data
);
