import { Routes } from '@angular/router';

import { TldComponent } from './tld/tld.component';

export const StatisticsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'tld',
        pathMatch: 'full',
      },
      {
        path: 'tld',
        component: TldComponent,
        data: { title: 'TLD', breadcrumb: 'TLD' },
      },
      {
        path: 'template_group',
        loadChildren:
          './template-group/template-group.module#StatisticsTemplateGroupModule',
        data: { title: 'Details', breadcrumb: 'DETAILS' },
      },
    ],
  },
];
