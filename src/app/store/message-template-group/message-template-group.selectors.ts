import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageTemplateGroupState } from './message-template-group.states';

export const name = 'messageTemplateGroup';
export const messageTemplateGroupSelector = createFeatureSelector<
  MessageTemplateGroupState
>(name);

export const didFetchSelector = createSelector(
  messageTemplateGroupSelector,
  (state: MessageTemplateGroupState) => state.didFetch
);

export const fetchingSelector = createSelector(
  messageTemplateGroupSelector,
  (state: MessageTemplateGroupState) => state.fetching
);

export const processingSelector = createSelector(
  messageTemplateGroupSelector,
  (state: MessageTemplateGroupState) => state.processing
);

export const dataSelector = createSelector(
  messageTemplateGroupSelector,
  (state: MessageTemplateGroupState) => state.data
);

export const filterSelector = createSelector(
  messageTemplateGroupSelector,
  (state: MessageTemplateGroupState) => state.filter
);

export const metaSelector = createSelector(
  messageTemplateGroupSelector,
  (state: MessageTemplateGroupState) => state.meta
);
