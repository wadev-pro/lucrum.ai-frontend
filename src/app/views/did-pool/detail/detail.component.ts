import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, fromEvent, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DID_POOL, DIDS } from 'app/core/errors';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { formatDids } from 'app/shared/helpers/did.helper';
import { getBoolColor } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { DidPool } from 'app/shared/models/did-pool.model';
import {
  Did,
  DidUploadFileModel,
  DidUploadResponseModel,
} from 'app/shared/models/dids.model';
import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';
import { DidPoolService } from 'app/shared/services/apis/did-pool.service';
import { DidUploadService } from 'app/shared/services/apis/did-upload.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store';
import * as actions from 'app/store/did-pool/did-pool.actions';
import * as didActions from 'app/store/did/did.actions';
import {
  dataSelector,
  didFetchSelector,
  fetchingSelector,
  filterSelector,
  metaSelector,
} from 'app/store/did/did.selectors';
import { initialState } from 'app/store/did/did.states';
import { DidPoolDetailCopyPasteComponent } from './copy-paste/copy-paste.component';

@Component({
  selector: 'app-did-pool-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.style.scss'],
  animations: egretAnimations,
})
export class DidPoolDetailComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();
  filterableFields: string[] = [
    'did_code',
    'status',
    'message_gateway_provider_id',
    'activated_at',
    'reactivated_at',
    'deactivated_at',
    'deactivation_reason',
    'is_auto_purchased',
  ];

  columnHeaders: string[] = [
    'srNo',
    'did_code',
    'status',
    'message_gateway_provider_id',
    'activated_at',
    'reactivated_at',
    'deactivated_at',
    'deactivation_reason',
    'is_auto_purchased',
    'actions',
  ];

  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;
  public dids$: Observable<any>;
  public gatewayProviders$: Observable<any>;

  public filter: commonModels.Filter;
  public meta: commonModels.Meta;
  public search = '';

  public pagination: commonModels.TablePagination = {
    length: initialState.meta.total,
    pageIndex: initialState.filter.page,
    pageSize: initialState.filter.per_page,
    previousPageIndex: 0,
  };

  public didPoolId: string;
  public isReady: boolean;
  public didPool: DidPool;
  public dids: Array<Did>;

  public offset: number;

  getBoolColor = getBoolColor;

  constructor(
    private service$: DidPoolService,
    private uploadService$: DidUploadService,
    private route$: ActivatedRoute,
    private loader$: AppLoaderService,
    private store$: Store<AppState>,
    private confirmService$: AppConfirmService,
    private changeDetectorRefs$: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.filter$ = this.store$.select(filterSelector);
    this.meta$ = this.store$.select(metaSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
    this.fetching$ = this.store$.select(fetchingSelector);
    this.dids$ = this.store$.select(dataSelector);
    this.gatewayProviders$ = this.store$.select(
      state => state.gatewayProvider.data
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.store$.dispatch(new didActions.ClearDetail());
    this.isReady = false;
    this.route$.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.didPoolId = params.get('id');
      this.initData();
    });

    setTimeout(() => {
      this.loader$.open();
    }, 10);
    this.service$
      .getById(this.didPoolId)
      .pipe(
        map(result => {
          this.didPool = result;
          this.isReady = true;
          this.loader$.close();
          this.changeDetectorRefs$.detectChanges();
        }),
        catchError(() => {
          this.store$.dispatch(
            new actions.AddError({
              error: DID_POOL.GET_ERROR,
            })
          );
          return of(DID_POOL.GET_ERROR);
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
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((search: string) => {
        this.onFilterChange(search);
      });

    combineLatest(this.dids$, this.gatewayProviders$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([dids, gatewayProviders]) => {
        if (!deepEqual(this.dids, dids) && gatewayProviders.length) {
          this.dids = formatDids(dids, gatewayProviders);
          this.changeDetectorRefs$.detectChanges();
        }
      });

    combineLatest(this.filter$, this.didFetch$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([filterData, didFetch]) => {
        if (!deepEqual(this.filter, filterData) || !didFetch) {
          this.filter = filterData;
          this.initFilter();
          this.loadData();
        }
      });

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
  }

  loadData() {
    const payload = {
      did_pool_id: this.didPoolId,
      filter: this.filter,
    };
    this.store$.dispatch(new didActions.GetList(payload));
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
    this.changeDetectorRefs$.detectChanges();
    this.offset = this.meta.from;
  }

  initFilter() {
    this.search = this.filter.search;
  }

  onFilterChange(search: string) {
    let data = {
      search: search,
    };
    if (search) {
      data = Object.assign(data, { page: 1 });
    }
    this.updateFilter(data);
  }

  updateFilter(data) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.store$.dispatch(new didActions.UpdateFilter(updated_filter));
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  sortData(event) {
    const updated_filter = {
      order_by: event.active ? event.active : initialState.filter.order_by,
      order_dir: event.direction
        ? event.direction
        : initialState.filter.order_dir,
    };
    this.store$.dispatch(new didActions.UpdateFilter(updated_filter));
  }

  onActivate(item: Did) {
    const payload = {
      id: item.id,
    };
    this.store$.dispatch(new didActions.Activate(payload));
  }

  onDeactivate(item: Did) {
    const payload = {
      id: item.id,
    };
    this.store$.dispatch(new didActions.Deactivate(payload));
  }

  onDelete(item) {
    this.confirmService$
      .confirm({ message: `Delete '${item.did_code}'?` })
      .subscribe(res => {
        if (res) {
          const payload = {
            id: item.id,
          };
          this.store$.dispatch(new didActions.Delete(payload));
        }
      });
  }

  onCopyPasteButton() {
    const title = 'Copy/Paste DIDs';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DidPoolDetailCopyPasteComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: {} },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const { dids } = res;
      const filename = 'dids_' + new Date().getTime() + '.csv';
      const file = new File([dids], filename);
      this.uploadFile(file);
    });
  }

  uploadFile(file: File) {
    this.loader$.open();
    this.uploadService$
      .uploadFile(file)
      .pipe(
        map((result: DidUploadResponseModel) => {
          this.uploadDid(result);
        }),
        catchError(() => {
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

  uploadDid(fileResult: DidUploadResponseModel) {
    const request: DidUploadFileModel = {
      DidPoolId: this.didPoolId,
      MessageGatewayProviderId: this.didPool.messageGatewayProviderId,
      FileName: fileResult.fileName,
    };
    this.uploadService$
      .uploadDids(request)
      .pipe(
        map(result => {
          const { uploaders: uploaders } = result;
          this.loadData();
          this.loader$.close();
        }),
        catchError(() => {
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
}
