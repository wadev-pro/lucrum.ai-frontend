import { Filter, Link, Meta } from './common.model';
import { MessageGatewayProvider } from './message-gateway-provider.model';
export interface DidFilter extends Filter {
  domain_pool_id: string;
}

export interface Did {
  id: string;
  didPoolId: string;
  code: string;
  messageGatewayProviderId: string;
  messageGatewayProvider?: MessageGatewayProvider;
  activatedAt: string;
  isAutoPurchased: boolean;
  status: number;
  deactivatedAt: string;
  deactivatedBy: string;
  deactivationReason: string;
  reactivatedAt: string;
  reactivatedBy: string;
}

export interface DidResponse {
  data: Array<Did>;
  links: Link;
  meta: Meta;
}

export interface DidUploadResponseModel {
  contentDisposition: string;
  contentType: string;
  fileName: string;
  fileSizeInBytes: number;
  s3FullUrl: string;
}

export interface DidUploadFileModel {
  DidPoolId: string;
  MessageGatewayProviderId: string;
  FileName: string;
}

export interface DidUploaderStatusModel {
  statusCode: number;
  statusName: string;
}
