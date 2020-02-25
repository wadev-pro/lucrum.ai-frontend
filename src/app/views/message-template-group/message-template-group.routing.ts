import { Routes } from '@angular/router';

import { MessageTemplateGroupDetailComponent } from './detail/detail.component';
import { MessageTemplateGroupComponent } from './message-template-group.component';

export const MessageTemplateGroupRoutes: Routes = [
  {
    path: '',
    component: MessageTemplateGroupComponent,
  },
  {
    path: ':id',
    component: MessageTemplateGroupDetailComponent,
    data: { title: 'Detail', breadcrumb: 'DETAIL' },
  },
];
