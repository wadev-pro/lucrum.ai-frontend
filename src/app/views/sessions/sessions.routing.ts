import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { AnonymousGuard } from 'app/shared/services/auth/anonymous.guard';
import { AuthGuard } from 'app/shared/services/auth/auth.guard';

export const SessionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'signin',
        canActivate: [AnonymousGuard],
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AnonymousGuard],
        data: { title: 'Signup' },
      },
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AnonymousGuard],
        data: { title: 'Signin' },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
        data: { title: 'Signin' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'Forgot password' },
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent,
        data: { title: 'Lockscreen' },
      },
      {
        path: '404',
        component: NotFoundComponent,
        data: { title: 'Not Found' },
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: { title: 'Error' },
      },
    ],
  },
];
