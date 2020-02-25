import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import * as _ from 'underscore';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as commonModels from 'app/shared/models/common.model';
import { TablePagination } from 'app/shared/models/common.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/did-pool/did-pool.actions';
import { initialState } from 'app/store/did-pool/did-pool.states';
import * as didActions from 'app/store/did/did.actions';

import { Router } from '@angular/router';
import { DIDS } from 'app/core/errors';
import { DidPool, DidPoolRequest } from 'app/shared/models/did-pool.model';
import {
  DidUploadFileModel,
  DidUploadResponseModel,
} from 'app/shared/models/dids.model';
import { DidUploadService } from 'app/shared/services/apis/did-upload.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';
import {
  didFetchSelector,
  fetchingSelector,
  filterSelector,
  metaSelector,
} from 'app/store/did-pool/did-pool.selectors';
import { DidPoolTableEditModalComponent } from './table/edit-modal/edit-modal.component';
import { DidPoolTableUploadModalComponent } from './table/upload-modal/upload-modal.component';

@Component({
  selector: 'app-did-pool',
  templateUrl: './did-pool.component.html',
  styleUrls: ['./did-pool.component.scss'],
  animations: egretAnimations,
})
export class DidPoolComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public campaignId$: Observable<any>;
  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public processing$: Observable<any>;
  public createSuccess$: Observable<any>;

  public campaign_id: string;
  public filter: commonModels.Filter = initialState.filter;
  public meta: commonModels.Meta = initialState.meta;
  public search = '';

  public pagination: TablePagination = {
    length: initialState.meta.total,
    pageIndex: initialState.filter.page,
    pageSize: initialState.filter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmService$: AppConfirmService,
    private authenticationService$: AuthService,
    private didUploadService$: DidUploadService,
    private loader$: AppLoaderService,
    private router$: Router
  ) {
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.meta$ = this.store$.select(metaSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
    this.createSuccess$ = this.store$.select(
      state => state.didPool.createSuccess
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.campaignId$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(campaign_id => {
          this.campaign_id = campaign_id;
          this.initData();
        })
      )
      .subscribe();
  }
  initData() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 2 || !res.length),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
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

    this.createSuccess$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(createSuccess => {
          if (createSuccess) {
            this.onUploadFile(createSuccess);
            this.store$.dispatch(new actions.DeleteCreateSuccess());
          }
        })
      )
      .subscribe();

    this.loadData();
  }

  loadData() {
    this.store$.dispatch(new actions.GetList());
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
    this.changeDetectorRefs$.detectChanges();
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
    const title = 'Add DID Pool';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DidPoolTableEditModalComponent,
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

      const payload: DidPoolRequest = {
        name: res.name,
        messageGatewayProviderId: res.messageGatewayProvider.id,
        maxPoolSize: res.maxPoolSize,
        minPoolSize: res.minPoolSize,
        autoPurchaseDids: res.autoPurchaseDids,
        didCost: res.didCost,
        currency: res.currency,
        username: res.username,
        password: res.password,
        userId: this.authenticationService$.getApiIdentification(),
        mtSmsCost: res.mtSmsCost,
        isLucrumRoute: res.isLucrumRoute,
        linkAllowed: res.linkAllowed
      };

      this.store$.dispatch(new actions.Create(payload));
    });
  }

  onUploadFile(didPool: DidPool) {
    const title = 'Upload DIDs';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DidPoolTableUploadModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: didPool },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      if (res.type === 0 && res.filename) {
        this.uploadFile(res.filename, didPool);
      } else if (res.type === 1) {
        const { dids } = res;
        const filename = 'dids_' + new Date().getTime() + '.csv';
        const file = new File([dids], filename);
        this.uploadFile(file, didPool);
      }
    });
  }

  uploadFile(file, didPool: DidPool) {
    this.loader$.open();
    this.didUploadService$
      .uploadFile(file)
      .pipe(
        map((result: DidUploadResponseModel) => {
          this.uploadDid(result, didPool);
        }),
        catchError(err => {
          this.loader$.close();
          this.store$.dispatch(
            new didActions.AddError({
              error: DIDS.UPLOAD_ERROR,
            })
          );
          return of(DIDS.UPLOAD_ERROR);
        })
      )
      .subscribe();
  }

  uploadDid(fileResult: DidUploadResponseModel, didPool: DidPool) {
    const request: DidUploadFileModel = {
      DidPoolId: didPool.id,
      MessageGatewayProviderId: didPool.messageGatewayProviderId,
      FileName: fileResult.fileName,
    };
    this.didUploadService$
      .uploadDids(request)
      .pipe(
        map(result => result),
        catchError(err => {
          this.loader$.close();
          this.store$.dispatch(
            new didActions.AddError({
              error: DIDS.UPLOAD_ERROR,
            })
          );
          return of(DIDS.UPLOAD_ERROR);
        })
      )
      .subscribe(result => {
        this.loader$.close();
        this.router$.navigate(['did_pools/' + didPool.id]);
      });
  }
}
