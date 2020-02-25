import { Routes } from '@angular/router';
import { ProfileOverviewEditComponent } from './overview-edit/overview-edit.component';
import { ProfileOverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile.component';
import { SettingsComponent} from './settings/settings.component';

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'overview',
        component: ProfileOverviewComponent,
        data: { title: 'Overview', breadcrumb: 'Overview' },
      },
      {
        path: 'edit',
        component: ProfileOverviewEditComponent,
        data: { title: 'Edit', breadcrumb: 'Edit' },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Settings', breadcrumb: 'SETTINGS' }
      },
    ],
  },
];
