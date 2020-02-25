import { EventHistory } from 'app/shared/models/event-history.model';

export interface EventHistoryState {
  fetching: boolean;
  didFetch: boolean;
  data: Array<EventHistory>;
}

export const initialState: EventHistoryState = {
  fetching: false,
  didFetch: false,
  data: [],
};
