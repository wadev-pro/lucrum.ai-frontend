import { gatewayProviderReducer } from './gateway-provider.reducers';
import { name } from './gateway-provider.selectors';

export const store = {
  name,
  gatewayProviderReducer: gatewayProviderReducer,
  config: {},
};
