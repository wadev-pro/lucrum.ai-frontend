import { Filter, Meta } from './common.model';

export interface MessageTemplateGroup {
  groupId?: string;
  name: string;
  createdBy?: string;
  createdAt?: string;
  lastUpdateBy?: string;
  lastUpdateAt?: string;
  isRemoved?: boolean;
  isReplyBackGroup?: boolean;
}

export interface MessageTemplateGroupResponse {
  data: Array<MessageTemplateGroup>;
}

export interface AllMessageTemplateItem {
  messageTemplateId: string;
  messageTemplateGroupId: string;
  template: string;
  preview: string;
}
