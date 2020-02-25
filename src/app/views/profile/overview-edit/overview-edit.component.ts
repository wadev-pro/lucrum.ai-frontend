import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomValidators } from 'ng2-validation';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as _ from 'underscore';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Profile, UpdateUser } from 'app/shared/models/user.model';
import { FormControlService } from 'app/shared/services/form-control.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/auth/authentication.action';
import {
  dataSelector,
  didFetchSelector,
  fetchingSelector,
} from 'app/store/auth/authentication.selector';

@Component({
  selector: 'app-profile-overview-edit',
  templateUrl: './overview-edit.component.html',
  styleUrls: ['./overview-edit.component.scss'],
  animations: egretAnimations,
})
export class ProfileOverviewEditComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public userProfile: Profile;

  public search = '';

  profileForm: FormGroup;

  constructor(
    private store$: Store<AppState>,
    private formBuilder$: FormBuilder,
    private formControlService$: FormControlService
  ) {
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    const password = new FormControl('', [Validators.minLength(6)]);
    const confirmPassword = new FormControl('', [
      CustomValidators.equalTo(password),
      Validators.minLength(6),
    ]);

    this.profileForm = this.formBuilder$.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: password,
      confirmPassword: confirmPassword,
    });

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
        tap((profile: Profile) => this.initData(profile))
      )
      .subscribe();
  }

  loadData() {
    this.store$.dispatch(new actions.GetUserInfo());
  }

  initData(profile: Profile) {
    this.userProfile = profile;
    this.profileForm.patchValue({
      username: this.userProfile.name,
      firstname: this.userProfile.first_name,
      lastname: this.userProfile.last_name,
    });
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.formControlService$.validateAllFormFields(this.profileForm);
    } else {
      const payload: UpdateUser = {
        name: this.profileForm.value.username,
        first_name: this.profileForm.value.firstname,
        last_name: this.profileForm.value.lastname,
      };
      if (this.profileForm.value.password) {
        payload['password'] = this.profileForm.value.password;
        payload['password_confirmation'] = this.profileForm.value.password;
      }
      this.store$.dispatch(new actions.UpdateUserInfo(payload));
    }
  }
}
