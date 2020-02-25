import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageTemplateState } from './message-template.states';

export const name = 'messageTemplate';
export const messageTemplateSelector = createFeatureSelector<
  MessageTemplateState
>(name);

export const didFetchSelector = createSelector(
  messageTemplateSelector,
  (state: MessageTemplateState) => state.didFetch
);

export const fetchingSelector = createSelector(
  messageTemplateSelector,
  (state: MessageTemplateState) => state.fetching
);

export const processingSelector = createSelector(
  messageTemplateSelector,
  (state: MessageTemplateState) => state.processing
);

export const dataSelector = createSelector(
  messageTemplateSelector,
  (state: MessageTemplateState) => state.data
);

export const filterSelector = createSelector(
  messageTemplateSelector,
  (state: MessageTemplateState) => state.filter
);

export const metaSelector = createSelector(
  messageTemplateSelector,
  (state: MessageTemplateState) => state.meta
);
