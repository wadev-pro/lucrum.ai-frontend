import { Routes } from '@angular/router';

import { TemplateGroupDetailComponent } from './detail/template-group-detail.component';
import { TemplateGroupComponent } from './template-group.component';

export const StatisticsTemplateGroupRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TemplateGroupComponent,
        data: { title: 'TLD', breadcrumb: 'TLD' },
      },
      {
        path: ':group_id',
        component: TemplateGroupDetailComponent,
        data: { title: 'Template Group', breadcrumb: 'TEMPLATEGROUP' },
      },
    ],
  },
];
