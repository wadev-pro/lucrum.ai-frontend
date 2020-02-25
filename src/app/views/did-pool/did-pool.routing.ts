import { Routes } from '@angular/router';

import { DidPoolDetailComponent } from './detail/detail.component';
import { DidPoolComponent } from './did-pool.component';

export const DidPoolRoutes: Routes = [
  {
    path: '',
    component: DidPoolComponent,
  },
  {
    path: ':id',
    loadChildren: './detail/did-pool-detail.module#DidPoolDetailModule',
    data: { title: 'Details', breadcrumb: 'DETAILS' },
  },
];
