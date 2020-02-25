import { FileTags } from 'app/shared/models/common.model';
import { DidPool } from './did-pool.model';
import { MessageTemplateGroup } from './message-template-group.model';

export interface CampaignDetail {
  name: string;
  createdAt: string;
  createdBy: string;
  lastUpdateBy: string;
  lastUpdateAt: string;
  userId: string;
  messageTemplateGroupId: string;
  messageTemplateGroup: MessageTemplateGroup;
  didPoolId: string;
  didPool: DidPool;
  callImpressionUrl: string;
  destinationUrl: string;
  fileUrl: string;
  cronExpression: string;
  scheduleTime: string;
  disableCarrierCheck: boolean;
  injectTestMessageEvery: number;
  deliveryInterval: string;
  routingPlanId: string;
  maxNumberOfSendMessagesForNoneClickers: number;
  subDomainLength: number;
  processingStatus: number;
  validationCompletedAt: string;
  validationStartedAt: string;
  validationFailureReason: string;
  lastProcessingStartRequestedAt: string;
  lastProcessingStartedAt: string;
  lastProcessingStartRequestedBy: string;
  lastProcessingStartedBy: string;
  lastProcessingStartedFromSequenceNumber: number;
  lastProcessingRunAt: string;
  lastProcessingException: string;
  lastProcessingStopRequestedBy: string;
  lastProcessingStopRequestedAt: string;
  lastProcessingStopException: string;
  lastProcessingStoppedAt: string;
  lastProcessingStoppedBy: string;
  lastMessageCraftingStartedAt: string;
  lastMessageCraftingFinishedAt: string;
  autoStart: boolean;
  initialProcessingBatchSize: number;
  isEmpty: boolean;
  campaignSequenceNumber: number;
  composerJobId: string;
  validationJobId: string;
  requestedProcessingBatchSize: number;
  totalCampaignFileMessageCount: number;
  totalSeedMessagesGenerated: number;
  totalMessageCount: number;
  totalBatchesAttemptedCount: number;
  totalBatchesSuccessfullyCompletedCount: number;
  badRecordsFoundCount: number;
  vertical: string;
  fileTags: FileTags;
  qualityCheckConcurrencyLimit: number;
  campaignRunnerConcurrencyLimit: number;
  conversationId: number;
}

export interface ProcessStatus {
  statusCode: number;
  statusName: string;
}

export interface CampaignFilter {
  start_date: string;
  end_date: string;
  search: string;
  order_by: string;
  order_dir: string;
  page: number;
  per_page: number;
}

export interface CampaignMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface CampaignLink {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface CampaignInfo {
  no: number;
  campaign_id: string;
  name: string;
  processing_status: number;
  created_at: Date;
  button_status: CampaignAction;
}

export interface CampaignAction {
  show_edit: boolean;
  show_detail: boolean;
  show_start: boolean;
  show_stop: boolean;
  show_testing: boolean;
  show_check: boolean;
  show_stop_check: boolean;
}

export interface CampaignStatistics {
  campaign_id: string;
  sentcount: number;
  mobileclickscount: number;
  otherclickscount: number;
  conversioncount: number;
  cost: number;
  revenue: number;
  profit: number;
  roi: number;
  ctr: number;
  opt_rate: number;
  complainer_rate: number;
  reply_rate: number;
}

export interface Campaign extends CampaignInfo, CampaignStatistics {}

export interface CampaignResponse {
  data: Array<Campaign>;
  meta: CampaignMeta;
  link: CampaignLink;
}

export interface UploadResponseModel {
  contentDisposition: string;
  contentType: string;
  fileName: string;
  fileSizeInBytes: number;
  s3FullUrl: string;
}

export interface ComposeModel {
  userId?: string;
  fileName?: string;
  messageTemplateGroupId: string;
  didPoolId: string;
  campaignName: string;
  scheduleTime?: string;
  callImpressionUrl: string;
  destinationUrl: string;
  seedMessageEvery: number;
  deliveryAcrossHours: number;
  deliveryAcrossMinutes: number;
  routingPlanId?: string;
  domains?: string;
  disableCarrierCheck: boolean;
  autoStart?: boolean;
  batchSize?: number;
  vertical: string;
  fileTags: object;
  conversationId: string;
  carrierBlacklist: Array<string>;
  maxNumberOfSendMessagesForNoneClickers: number;
  qualityCheckConcurrencyLimit: number;
  campaignRunnerConcurrencyLimit: number;
  isReplyBackCampaign?: boolean;
  replyBackMessageTemplateGroupId?: string;
  replyBackDidPoolId?: string;
}
