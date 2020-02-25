import { Routes } from '@angular/router';

import { LeadInfoComponent } from './lead-info/lead-info.component';
import { LeadNumberLookupComponent } from './number-lookup/number-lookup.component';
import { ReportStatusComponent } from './report-status/report-status.component';
import { ReportsComponent } from './report/report.component';

export const LeadRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'number_lookup',
        pathMatch: 'full',
      },
      {
        path: 'number_lookup',
        component: LeadNumberLookupComponent,
        data: { title: 'Number Lookup', breadcrumb: 'Number Lookup' },
      },
      {
        path: 'lead_info',
        component: LeadInfoComponent,
        data: { title: 'Lead Info', breadcrumb: 'Lead Info' },
      },
      {
        path: 'mining',
        component: ReportsComponent,
        data: { title: 'Lead Mining', breadcrumb: 'Lead Mining' },
      },
      {
        path: 'files',
        component: ReportStatusComponent,
        data: { title: 'Files', breadcrumb: 'Files' },
      },
    ],
  },
];
