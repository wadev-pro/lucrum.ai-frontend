import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { fromEvent, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import * as _ from 'underscore';

import { egretAnimations } from 'app/shared/animations/egret-animations';

import { TablePagination } from 'app/shared/models/common.model';
import * as commonModels from 'app/shared/models/common.model';
import { User } from 'app/shared/models/user.model';
import { AppState } from 'app/store/';
import * as actions from 'app/store/users/users.actions';
import {
  didFetchSelector,
  fetchingSelector,
  filterSelector,
  metaSelector,
} from 'app/store/users/users.selectors';
import { initialState } from 'app/store/users/users.states';
import { UsersEditModalComponent } from './table/edit-modal/edit-modal.component';
import * as PaymentActions from '../../store/billing/payment/payment.actions';
import { AuthService } from 'app/shared/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: egretAnimations,
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;

  public filter: commonModels.Filter = initialState.filter;
  public meta: commonModels.Meta = initialState.meta;
  public search = '';

  public pagination: TablePagination = {
    length: initialState.meta.total,
    pageIndex: initialState.filter.page,
    pageSize: initialState.filter.per_page,
    previousPageIndex: 0,
  };

  constructor(private store$: Store<AppState>,
              private dialog: MatDialog,
              private authService: AuthService) {
    this.filter$ = this.store$.select(filterSelector);
    this.meta$ = this.store$.select(metaSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.initData();
  }
  initData() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 2 || !res.length),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.onFilterChange();
      });

    this.filter$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(data => {
          if (!deepEqual(this.filter, data)) {
            this.filter = data;
            this.initFilter();
          }
        })
      )
      .subscribe();

    this.meta$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(meta => {
          if (!deepEqual(this.meta, meta)) {
            this.meta = meta;
            this.initMeta();
          }
        })
      )
      .subscribe();

    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();
  }

  loadData() {
    this.store$.dispatch(new actions.GetList(this.filter));
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
  }

  initFilter() {
    this.search = this.filter.search;
  }

  onFilterChange() {
    let data = {
      search: this.search,
    };
    if (this.search) {
      data = _.extend(data, {
        page: 1,
      });
    }
    this.updateFilter(data);
  }

  updateFilter(data) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.store$.dispatch(new actions.UpdateFilter(updated_filter));
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  onAddItem() {
    const title = 'Add User';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      UsersEditModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: {}, type: 'add' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const payload: User = {
        name: res.name,
        password: res.password,
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        role: 2,
        mtMessageWithLinkPrice: res.mtMessageWithLinkPrice,
        mtMessageWithoutLinkPrice: res.mtMessageWithoutLinkPrice,
        mtUserRouteFee: res.mtUserRouteFee,
        didPrice: res.didPrice
      };
      this.store$.dispatch(new actions.Create(payload));

      this.store$.dispatch(new PaymentActions.UpdatePricing({
        mtMessageWithLinkPrice: res.mtMessageWithLinkPrice || 0,
        mtMessageWithoutLinkPrice: res.mtMessageWithoutLinkPrice || 0,
        mtUserRouteFee: res.mtUserRouteFee || 0,
        didPrice: res.didPrice || 0,
        userId: res.email,
        doneBy: this.authService.getApiIdentification()
      }));

      if (!res.addCredits) {
        return;
      }
      this.store$.dispatch(new PaymentActions.UpdateBalance({
        userId: res.email,
        amount: res.addCredits
      }));
    });
  }
}
