import { Routes } from '@angular/router';

import { DidPoolDetailComponent } from './detail.component';
import { DidPoolDetailUploadsComponent } from './uploads/uploads.component';

export const DidPoolDetailRoutes: Routes = [
  {
    path: '',
    component: DidPoolDetailComponent,
  },
  {
    path: 'upload_dids',
    component: DidPoolDetailUploadsComponent,
    data: { title: 'Upload DIDs', breadcrumb: 'Upload DIDs' },
  },
];
