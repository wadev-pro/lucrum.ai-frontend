import { Meta } from 'app/shared/models/common.model';
import { MessageGatewayProvider } from './message-gateway-provider.model';

export interface DidPool {
  messageGatewayProviderName: string;
  id: string;
  messageGatewayProviderId: string;
  createdAt: string;
  createdBy: string;
  maxDidPoolSize: number;
  minPoolSize: number;
  autoPurchaseDids: boolean;
  didCostAmount: number;
  didCodeCostCurrency: string;
  lastUpdateBy: string;
  lastUpdateAt: string;
  username: string;
  password: string;
  name: string;
  currentSize: number;
  mtSmsCost: number;
}

export interface DidPoolRequest {
  id?: string;
  messageGatewayProviderId?: string;
  messageGatewayProvider?: MessageGatewayProvider;
  maxPoolSize: number;
  minPoolSize: number;
  autoPurchaseDids: boolean;
  didCost: number;
  currency: string;
  username: string;
  password: string;
  name: string;
  userId?: string;
  mtSmsCost?: number;
  isLucrumRoute: boolean;
  linkAllowed: boolean;
}

export interface DidUploadStatus {
  uploaderId: string;
  status: number;
  uploadedFileDidCount: number;
  successfullyUploadedCount: number;
}

export interface DidPoolResponse {
  items: Array<DidPool>;
}
