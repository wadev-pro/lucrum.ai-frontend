import { Routes } from '@angular/router';

import { MessageTemplateDetailComponent } from './detail/detail.component';
import { MessageTemplateComponent } from './message-template.component';

export const MessageTemplateRoutes: Routes = [
  {
    path: '',
    component: MessageTemplateComponent,
  },
  {
    path: ':id',
    component: MessageTemplateDetailComponent,
    data: { title: 'Detail', breadcrumb: 'DETAIL' },
  },
];
