import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CURRENCIES } from 'app/core/constants';
import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';
import { DidUploadService } from 'app/shared/services/apis/did-upload.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store';
import { dataSelector } from 'app/store/gateway-provider/gateway-provider.selectors';
import { dataSelector as authenticationSelector } from 'app/store/auth/authentication.selector';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Component({
  selector: 'app-did-pool-table-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class DidPoolTableEditModalComponent implements OnInit, OnDestroy {
  @ViewChild('singleSelect') singleSelect: MatSelect;

  protected onDestroy$ = new Subject<void>();

  public itemForm: FormGroup;
  public groupFilterCtrl: FormControl = new FormControl();
  public gatewayProviders: Array<MessageGatewayProvider>;
  public filteredGatewayProviders: Array<MessageGatewayProvider>;
  public currencies = CURRENCIES;
  public isAdminUser = false;
  public isLucrumRoute = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DidPoolTableEditModalComponent>,
    private fb: FormBuilder,
    private store$: Store<AppState>,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.store$
      .select(dataSelector)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.gatewayProviders = data;
        this.filteredGatewayProviders = this.gatewayProviders.slice(0);
        this.buildItemForm(this.data.payload);
      });

    // listen for search field value changes
    this.groupFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterGatewayProviders();
      });

    this.store$
      .select(authenticationSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((authenticationInfo) => {
          if ((authenticationInfo.role && authenticationInfo.role === 1) || this.localStorageService.isEmulating()) {
            this.isAdminUser = true;
          }
          if (this.itemForm && (!this.isAdminUser && this.isLucrumRoute)) {
            this.itemForm.disable();
          }
        })
      )
      .subscribe();
  }

  filterGatewayProviders() {
    if (!this.gatewayProviders) {
      return;
    }
    // get the search keyword
    let search = this.groupFilterCtrl.value;
    if (!search) {
      this.filteredGatewayProviders = this.gatewayProviders.slice(0);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredGatewayProviders = this.gatewayProviders.filter(
      item => item.name.toLowerCase().indexOf(search) > -1
    );
  }

  buildItemForm(item) {
    let currentProvider = null;
    if (item.messageGatewayProviderId) {
      currentProvider = this.gatewayProviders.find(
        t_item => t_item.id === item.messageGatewayProviderId
      );
    }

    const formData = {
      name: [item.name || '', Validators.required],
      didCost: [item.didCostAmount || 0, Validators.required],
      username: [item.username || '', Validators.required],
      password: [item.password || '', Validators.required],
      mtSmsCost: [item.mtSmsCost || '', Validators.required],
      isLucrumRoute: [item.isLucrumRoute === true],
      linkAllowed: [item.linkAllowed === true],
      currency: 'usd'
    };
    this.isLucrumRoute = item.isLucrumRoute;
    if (this.data.type === 'add') {
      formData['messageGatewayProvider'] = [
        currentProvider || null,
        Validators.required,
      ];
    }
    this.itemForm = this.fb.group(formData);
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
