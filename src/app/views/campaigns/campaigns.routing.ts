import { Routes } from '@angular/router';

import { CampaignsComponent } from './campaigns.component';
import { CampaignCloneComponent } from './clone/clone.component';
import { CampaignEditComponent } from './edit/edit.component';

export const CampaignsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CampaignsComponent,
        data: { title: '', breadcrumb: '' },
      },
      {
        path: ':campaign_id',
        loadChildren: './details/campaign-details.module#CampaignDetailsModule',
        data: { title: 'Details', breadcrumb: 'DETAILS' },
      },
      {
        path: ':campaign_id/edit',
        component: CampaignEditComponent,
        data: { title: 'Edit', breadcrumb: 'EDIT' },
      },
      {
        path: ':campaign_id/clone',
        component: CampaignCloneComponent,
        data: { title: 'Clone', breadcrumb: 'CLONE' },
      },
    ],
  },
];
