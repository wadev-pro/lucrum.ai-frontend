import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as _ from 'underscore';

import { egretAnimations } from 'app/shared/animations/egret-animations';

import { Profile } from 'app/shared/models/user.model';
import { AppState } from 'app/store/';
import * as actions from 'app/store/auth/authentication.action';
import {
  dataSelector,
  didFetchSelector,
  fetchingSelector,
} from 'app/store/auth/authentication.selector';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: egretAnimations,
})
export class ProfileOverviewComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public userProfile: Profile;

  public search = '';

  constructor(private store$: Store<AppState>) {
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();

    this.store$
      .select(dataSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((profile: Profile) => (this.userProfile = profile))
      )
      .subscribe();
  }

  loadData() {
    this.store$.dispatch(new actions.GetUserInfo());
  }
}
