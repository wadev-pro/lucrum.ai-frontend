import * as campaignModels from 'app/shared/models/campaign.model';

export interface ProcessStatusState {
  fetching: boolean;
  didFetch: boolean;
  data: Array<campaignModels.ProcessStatus>;
}

export const initialState: ProcessStatusState = {
  fetching: false,
  didFetch: false,
  data: [],
};
