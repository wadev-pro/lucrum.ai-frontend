import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { AppState } from 'app/store';
import { GetUserInfo } from 'app/store/auth/authentication.action';
import { didFetchSelector } from 'app/store/auth/authentication.selector';
import { GetList as GetGatewayProviderList } from 'app/store/gateway-provider/gateway-provider.actions';
import { didFetchSelector as GatewayProviderDidFetchSelector } from 'app/store/gateway-provider/gateway-provider.selectors';
import { GetList as GetProcessStatusList } from 'app/store/process-status/process-status.actions';
import { didFetchSelector as ProcessStatusDidFetchSelector } from 'app/store/process-status/process-status.selectors';
import { GetList as GetUploaderStatusList } from 'app/store/uploader-status/uploader-status.actions';
import { didFetchSelector as UploaderStatusDidFetchSelector } from 'app/store/uploader-status/uploader-status.selectors';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;

  constructor(
    private store: Store<AppState>,
    private authenticationService: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authenticationService.getToken() &&
      this.authenticationService.getApiIdentification()
    ) {
      // get auth info
      this.store
        .select(didFetchSelector)
        .pipe(
          tap(didFetch => !didFetch && this.store.dispatch(new GetUserInfo()))
        )
        .subscribe();

      // get process status info
      this.store
        .select(ProcessStatusDidFetchSelector)
        .pipe(
          tap(
            didFetch =>
              !didFetch && this.store.dispatch(new GetProcessStatusList())
          )
        )
        .subscribe();

      // get process status info
      this.store
        .select(UploaderStatusDidFetchSelector)
        .pipe(
          tap(
            didFetch =>
              !didFetch && this.store.dispatch(new GetUploaderStatusList())
          )
        )
        .subscribe();

      // get gateway provider info
      this.store
        .select(GatewayProviderDidFetchSelector)
        .pipe(
          tap(
            didFetch =>
              !didFetch && this.store.dispatch(new GetGatewayProviderList())
          )
        )
        .subscribe();

      return true;
    } else {
      this.router.navigate(['/sessions/signin']);
      return false;
    }
  }
}
