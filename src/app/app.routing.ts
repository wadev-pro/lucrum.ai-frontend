import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session' },
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' },
      },
      {
        path: 'composer',
        loadChildren: './views/composer/composer.module#ComposerModule',
        data: { title: 'Composer', breadcrumb: 'COMPOSER' },
      },
      {
        path: 'statistics',
        loadChildren: './views/statistics/statistics.module#StatisticsModule',
        data: { title: 'Statistics', breadcrumb: 'STATISTICS' },
      },
      {
        path: 'campaigns',
        loadChildren: './views/campaigns/campaigns.module#CampaignsModule',
        data: { title: 'Camapaigns', breadcrumb: 'CAMPAIGNS' },
      },
      {
        path: 'did_pools',
        loadChildren: './views/did-pool/did-pool.module#DidPoolModule',
        data: { title: 'DID Pools', breadcrumb: 'DIDPOOLS' },
      },
      {
        path: 'message_template_group',
        loadChildren:
          './views/message-template-group/message-template-group.module#MessageTemplateGroupModule',
        data: {
          title: 'Message Template Groups',
          breadcrumb: 'MESSAGETEMPLATEGROUPS',
        },
      },
      {
        path: 'message_template',
        loadChildren:
          './views/message-template/message-template.module#MessageTemplateModule',
        data: { title: 'Message Templates', breadcrumb: 'MESSAGETEMPLATES' },
      },
      {
        path: 'seed_number',
        loadChildren: './views/seed-number/seed-number.module#SeedNumberModule',
        data: { title: 'Seed Numbers', breadcrumb: 'SEEDNUMBERS' },
      },
      {
        path: 'lead',
        loadChildren: './views/lead/lead.module#StatisticsModule',
        data: { title: 'Lead', breadcrumb: 'LEAD' },
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: { title: 'Profile', breadcrumb: 'PROFILE' },
      },
      {
        path: 'users',
        loadChildren: './views/users/users.module#UsersModule',
        data: { title: 'Users', breadcrumb: 'USERS' },
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: {title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path: 'billing',
        loadChildren: './views/billing/billing.module#BillingModule',
        data: {title: 'Billing', breadcrumb: 'Billing'}
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'sessions/404',
  },
];
