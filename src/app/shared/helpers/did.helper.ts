import { Did } from 'app/shared/models/dids.model';
import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';

export function formatDids(
  dids: Array<Did>,
  gatewayProviders: Array<MessageGatewayProvider>
): Array<Did> {
  return dids.map(item => {
    return {
      ...item,
      messageGatewayProvider: gatewayProviders.find(
        t_item => t_item.id === item.messageGatewayProviderId
      ),
    };
  });
}
