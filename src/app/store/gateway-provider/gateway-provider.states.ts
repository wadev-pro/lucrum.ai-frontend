import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';

export interface GatewayProviderState {
  fetching: boolean;
  didFetch: boolean;
  data: Array<MessageGatewayProvider>;
}

export const initialState: GatewayProviderState = {
  fetching: false,
  didFetch: false,
  data: [],
};
