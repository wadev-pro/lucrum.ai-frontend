import { Routes } from '@angular/router';

import { CampaignDetailsComponent } from './details.component';

export const CampaignDetailsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CampaignDetailsComponent,
        data: { title: '', breadcrumb: '' },
      },
    ],
  },
];
