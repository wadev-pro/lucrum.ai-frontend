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
import { of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { DID_POOL, DIDS } from 'app/core/errors';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as commonModels from 'app/shared/models/common.model';
import { DidPool, DidUploadStatus } from 'app/shared/models/did-pool.model';
import { DidUploaderStatusModel } from 'app/shared/models/dids.model';
import {
  DidUploadFileModel,
  DidUploadResponseModel,
} from 'app/shared/models/dids.model';
import { DidPoolService } from 'app/shared/services/apis/did-pool.service';
import { DidUploadService } from 'app/shared/services/apis/did-upload.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store';
import * as actions from 'app/store/did-pool/did-pool.actions';
import * as didActions from 'app/store/did/did.actions';
import { dataSelector as UploaderStatusDataSelector } from 'app/store/uploader-status/uploader-status.selectors';

@Component({
  selector: 'app-did-pool-detail-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.style.scss'],
  animations: egretAnimations,
})
export class DidPoolDetailUploadsComponent implements OnInit, OnDestroy {
  @ViewChild('inputFile') inputFile: ElementRef;

  private onDestroy$ = new Subject<void>();
  filterableFields: string[] = [];

  columnHeaders: string[] = [
    'srNo',
    'uploaderId',
    'status',
    'uploadedFileDidCount',
    'successfullyUploadedCount',
  ];

  public pagination: commonModels.TablePagination = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  };

  public fetching: boolean;
  public didPoolId: string;
  public didPool: DidPool;
  public fileSelected: any;
  public fileName: string;
  public uploadStatus: Array<DidUploadStatus> = [];
  public uploadStatusList: Array<DidUploadStatus> = [];
  public uploaderStatusList: Array<DidUploaderStatusModel> = [];

  public offset: number;

  constructor(
    private service$: DidUploadService,
    private didPoolService$: DidPoolService,
    private route$: ActivatedRoute,
    private loader$: AppLoaderService,
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.offset = 1;
    this.fetching = true;
    this.store$.dispatch(new didActions.ClearDetail());
    this.route$.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.didPoolId = params.get('id');
      this.initData();
    });

    this.store$
      .select(UploaderStatusDataSelector)
      .pipe(
        map(result => {
          this.uploaderStatusList = result;
        })
      )
      .subscribe();
  }

  onPaginateChange(event) {
    this.pagination.pageIndex = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.loadData();
  }

  initData() {
    this.didPoolService$
      .getById(this.didPoolId)
      .pipe(
        map(result => {
          this.didPool = result;
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
    this.loadUploadStatus();
  }

  loadUploadStatus() {
    this.service$
      .getUploadStatus(this.didPoolId)
      .pipe(
        map(result => {
          this.uploadStatusList = result.uploaders || [];
          this.loadData();
          this.fetching = false;
          this.loader$.close();
          this.changeDetectorRefs$.detectChanges();
        }),
        catchError(() => {
          this.fetching = false;
          this.changeDetectorRefs$.detectChanges();
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

  loadData() {
    const from = this.pagination.pageIndex * this.pagination.pageSize,
      size = this.pagination.pageSize;

    this.pagination.length = this.uploadStatusList.length;
    this.offset = from + 1;
    this.uploadStatus = this.uploadStatusList.slice(from, from + size);

    this.changeDetectorRefs$.detectChanges();
  }

  onFileSelect() {
    this.inputFile.nativeElement.click();
  }

  fileChangeEvent($e) {
    if ($e.srcElement && $e.srcElement.files && $e.srcElement.files.length) {
      this.fileSelected = $e.srcElement.files[0];
      this.fileName = this.fileSelected.name;
    }
  }

  uploadFile() {
    this.loader$.open();
    this.service$
      .uploadFile(this.fileSelected)
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
    this.service$
      .uploadDids(request)
      .pipe(
        map(result => {
          const { uploaders: uploaders } = result;
          this.uploadStatusList = uploaders;
          this.loadUploadStatus();
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

  getStatusColor(status?: number) {
    if (status > 4) {
      return 'warn';
    } else if (status > 2) {
      return 'primary';
    } else {
      return 'accent';
    }
  }

  getStatsLabel(status?: number) {
    const obj: DidUploaderStatusModel = this.uploaderStatusList.find(
      item => item.statusCode === status
    );
    return obj.statusName;
  }
}
