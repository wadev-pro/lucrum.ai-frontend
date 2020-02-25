import { DidUploaderStatusModel } from 'app/shared/models/dids.model';

export interface UploaderStatusState {
  fetching: boolean;
  didFetch: boolean;
  data: Array<DidUploaderStatusModel>;
}

export const initialState: UploaderStatusState = {
  fetching: false,
  didFetch: false,
  data: [],
};
