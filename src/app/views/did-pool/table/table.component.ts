import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import {
  filterBySearch,
  getBoolColor,
  sortByFilter,
} from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { DidPool, DidPoolRequest } from 'app/shared/models/did-pool.model';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/did-pool/did-pool.actions';
import {
  dataSelector,
  filterSelector,
} from 'app/store/did-pool/did-pool.selectors';
import { initialState } from 'app/store/did-pool/did-pool.states';
import { DidPoolTableEditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-did-pool-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class DidPoolTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = [
    'name',
    'messageGatewayProviderName',
    'currentSize',
    'minPoolSize',
    'maxDidPoolSize',
    'didCostAmount',
    'createdAt',
    'lastUpdateAt',
  ];
  columnHeaders: string[] = [
    'srNo',
    'name',
    'messageGatewayProviderName',
    'autoPurchaseDids',
    'currentSize',
    'minPoolSize',
    'maxDidPoolSize',
    'didCostAmount',
    'createdAt',
    'lastUpdateAt',
    'actions',
  ];

  private onDestroy$ = new Subject<void>();

  public didPool$: Observable<any>;
  public filter$: Observable<any>;

  public didPools: Array<DidPool>;
  public filter: commonModels.Filter;
  public offset: number;
  getBoolColor = getBoolColor;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private authenticationService$: AuthService
  ) {
    this.didPool$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    combineLatest(this.filter$, this.didPool$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, didPool]) => {
          this.applyFilter(didPool.slice(0), filter);
        })
      )
      .subscribe();
  }

  applyFilter(didPool: Array<DidPool>, filter: commonModels.Filter) {
    this.offset = (filter.page - 1) * filter.per_page;
    if (!deepEqual(didPool, this.didPools) || !deepEqual(filter, this.filter)) {
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(didPool.length / filter.per_page);
      didPool = sortByFilter(filter, didPool);
      if (searchKey) {
        didPool = filterBySearch(searchKey, this.filterableFields, didPool);
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: didPool.length,
      };
      this.store$.dispatch(new actions.UpdateMeta(meta));

      this.didPools = didPool.slice(from, to);
      this.changeDetectorRefs.detectChanges();
    }
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

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }

  onEdit(item: DidPool) {
    const title = 'Edit DID Pool';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DidPoolTableEditModalComponent,
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

      const payload: DidPoolRequest = {
        id: item.id,
        name: res.name,
        maxPoolSize: res.maxPoolSize,
        minPoolSize: res.minPoolSize,
        autoPurchaseDids: res.autoPurchaseDids,
        didCost: res.didCost,
        currency: res.currency,
        username: res.username,
        password: res.password,
        mtSmsCost: res.mtSmsCost,
        isLucrumRoute: res.isLucrumRoute,
        linkAllowed: res.linkAllowed
      };

      this.store$.dispatch(new actions.Update(payload));
    });
  }
}
