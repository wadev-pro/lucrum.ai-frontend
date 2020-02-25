import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { from, Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getBoolColor, getRoleName } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { User } from 'app/shared/models/user.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { PaymentService } from 'app/shared/services/apis/payment.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/users/users.actions';
import * as authentications from 'app/store/auth/authentication.action';
import * as PaymentActions from 'app/store/billing/payment/payment.actions';
import {
  dataSelector,
  didFetchSelector,
  filterSelector,
} from 'app/store/users/users.selectors';
import { initialState } from 'app/store/users/users.states';
import { UsersEditModalComponent } from './edit-modal/edit-modal.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class UsersTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = [
    'name',
    'first_name',
    'last_name',
    'email',
    'role',
    'created_at',
    'sentAvgSms',
    'balance'
  ];

  columnHeaders: string[] = [
    'srNo',
    'name',
    'first_name',
    'last_name',
    'email',
    'role',
    'created_at',
    'sentAvgSms',
    'balance',
    'actions',
  ];

  private onDestroy$ = new Subject<void>();

  public users$: Observable<any>;
  public filter$: Observable<any>;
  public didFetch$: Observable<any>;

  public users: Array<User> = [];
  public filter: commonModels.Filter;
  public offset: number;
  getBoolColor = getBoolColor;
  getRoleName = getRoleName;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmService$: AppConfirmService,
    private paymentService$: PaymentService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private loader$: AppLoaderService,
  ) {
    this.users$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.users$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(users => {
          if (!deepEqual(this.users, users)) {
            this.users = users;
            let counter = 0;
            this.users.forEach(user => {
              from(this.paymentService$.getBalance(user.email)).pipe(
                map(result => {
                  return {
                    userId: user.email,
                    balance: result.amount
                  }
                })
              )
                .subscribe((balanceData: any) => {
                  const user = this.users.find(user => user.email === balanceData.userId);
                  user.balance = balanceData.balance;
                  ++ counter;

                  if(counter === (this.users.length * 2 )) {
                    setTimeout(() => {
                      this.refreshTable();
                    }, 500);
                  }
              });
              from(this.paymentService$.getPricing(user.email)).pipe(
                map(result => {
                  return {
                    userId: user.email,
                    mtMessageWithLinkPrice: result.mtMessageWithLinkPrice,
                    mtMessageWithoutLinkPrice: result.mtMessageWithoutLinkPrice,
                    mtUserRouteFee: result.mtUserRouteFee,
                    didPrice: result.didPrice,
                  }
                })
              )
                .subscribe((pricingData: any) => {
                  const user = this.users.find(user => user.email === pricingData.userId);
                  user.mtMessageWithLinkPrice = pricingData.mtMessageWithLinkPrice;
                  user.mtMessageWithoutLinkPrice = pricingData.mtMessageWithoutLinkPrice;
                  user.mtUserRouteFee = pricingData.mtUserRouteFee;
                  user.didPrice = pricingData.didPrice;
                  ++ counter;

                  if(counter === (this.users.length * 2 )) {
                    setTimeout(() => {
                      this.refreshTable();
                    }, 500);
                  }
                });
            });

            this.refreshTable();
          }
        })
      )
      .subscribe();
  }

  sortData(event) {
    const updated_filter = {
      order_by: event.active ? event.active : initialState.filter.order_by,
      order_dir: event.direction
        ? event.direction
        : initialState.filter.order_dir,
    };
    this.store$.dispatch(new actions.UpdateFilter(updated_filter));
  }

  getRoleColor(role: number) {
    switch (role) {
      case 1:
        return 'primary';
      case 2:
      default:
        return 'accent';
    }
  }

  onEdit(item: User) {
    const title = 'Edit User';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      UsersEditModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: item, type: 'edit' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const data: User = {
        name: res.name,
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        role: item.role,
        mtMessageWithLinkPrice: res.mtMessageWithLinkPrice,
        mtMessageWithoutLinkPrice: res.mtMessageWithoutLinkPrice,
        mtUserRouteFee: res.mtUserRouteFee,
        didPrice: res.didPrice
      };
      if (res.password) {
        data['password'] = res.password;
      }

      const payload = {
        id: item.id,
        data: data,
      };
      this.store$.dispatch(new actions.Update(payload));

      this.store$.dispatch(new PaymentActions.UpdatePricing({
        mtMessageWithLinkPrice: res.mtMessageWithLinkPrice || 0,
        mtMessageWithoutLinkPrice: res.mtMessageWithoutLinkPrice || 0,
        mtUserRouteFee: res.mtUserRouteFee || 0,
        didPrice: res.didPrice || 0,
        userId: res.email,
        doneBy: this.authService.getApiIdentification()
      }));

      if(!res.addCredits) {
        return;
      }

      this.store$.dispatch(new PaymentActions.UpdateBalance({
        userId: res.email,
        amount: res.addCredits
      }));
    });
  }

  onDelete(item: User) {
    this.confirmService$
      .confirm({
        message: `Are you sure you want to delete user '${item.name}'?`,
      })
      .subscribe(res => {
        if (res) {
          const payload = {
            id: item.id,
          };
          this.store$.dispatch(new actions.Delete(payload));
        }
      });
  }

  emulateUser(item: User) {
    this.loader$.open();
    this.authService
      .emulate(item.id)
      .pipe(
        map(result => result)
      )
      .subscribe(res => {
        if (res.token_type) {
          this.localStorageService.clear();
          this.localStorageService.storeEmulationAuthorization(
            `${res.token_type} ${res.access_token}`
          );
          this.store.dispatch(new authentications.LoginSuccessful(res));
          setTimeout( () => {
            this.loader$.close();
            this.localStorageService.setData('identification', item.id.toString());
            window.location.href= '/';
          }, 3000);
        }
      });
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
  isNumber(val) { return typeof val === 'number'; }
}
