import { Filter, Meta } from './common.model';

export interface MessageTemplate {
  templateId?: string;
  name?: string;
  template?: string;
  createdBy?: string;
  createdAt?: string;
  lastUpdateBy?: string;
  lastUpdateAt?: string;
  isRemoved?: boolean;
  groupId?: string;
}

export interface MessageTemplatePreview {
  messageTemplateId: string;
  messageTemplateName?: string;
  messageTemplateGroupId: string;
  template: string;
  preview: string;
}

export interface MessageTemplateResponse {
  data: Array<MessageTemplate>;
}
