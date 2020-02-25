import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

import { FILTER_EVENT_TYPES } from 'app/core/constants';
import { FILE as FILE_ERROR } from 'app/core/errors';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getCurrentUTCTime, getReportStatus } from 'app/shared/helpers/utils';
import {
  filterBySearch,
  getBoolColor,
  getReportType,
  sortByFilter,
} from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { ReportStatus } from 'app/shared/models/reports.model';
import { FileService } from 'app/shared/services/apis/file.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { AppState } from 'app/store/';
import { AddError } from 'app/store/error/error.actions';
import * as actions from 'app/store/report-status/report-status.actions';
import {
  dataSelector,
  filterSelector,
} from 'app/store/report-status/report-status.selectors';
import { initialState } from 'app/store/report-status/report-status.states';

@Component({
  selector: 'app-report-status-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class ReportStatusTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = ['stateDate', 'endDate', 'filter', 'status'];

  columnHeaders: string[] = [
    'srNo',
    'type',
    'stateDate',
    'endDate',
    'filter',
    'status',
    'time',
    'log',
    'actions',
  ];

  private onDestroy$ = new Subject<void>();

  public reportStatus$: Observable<any>;
  public filter$: Observable<any>;

  public reportStatuses: Array<ReportStatus> = [];
  public filter: commonModels.Filter;
  public offset: number;
  getBoolColor = getBoolColor;
  getReportType = getReportType;
  getReportStatus = getReportStatus;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmService$: AppConfirmService,
    private authenticationService$: AuthService,
    private loader$: AppLoaderService,
    private fileService$: FileService
  ) {
    this.reportStatus$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    combineLatest(this.filter$, this.reportStatus$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, reportStatuses]) => {
          this.applyFilter(reportStatuses.slice(0), filter);
        })
      )
      .subscribe();
  }

  applyFilter(
    reportStatuses: Array<ReportStatus>,
    filter: commonModels.Filter
  ) {
    this.offset = (filter.page - 1) * filter.per_page;
    if (
      !deepEqual(reportStatuses, this.reportStatuses) ||
      !deepEqual(filter, this.filter)
    ) {
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(reportStatuses.length / filter.per_page);
      reportStatuses = sortByFilter(filter, reportStatuses);
      if (searchKey) {
        reportStatuses = filterBySearch(
          searchKey,
          this.filterableFields,
          reportStatuses
        );
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: reportStatuses.length,
      };
      this.store$.dispatch(new actions.UpdateMeta(meta));

      this.reportStatuses = reportStatuses.slice(from, to);
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

  download(item: ReportStatus) {
    this.loader$.open();
    this.fileService$
      .getExportToken(item.id)
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        if (result && result['token']) {
          const token = result['token'];
          this.fileService$.exportFile(token);
        } else {
          this.store$.dispatch(
            new AddError({
              type: FILE_ERROR.TYPE,
              message: FILE_ERROR.EXPORT_ERROR,
            })
          );
        }
        this.loader$.close();
      });
  }

  formatFilter(filter) {
    const filterObj = JSON.parse(filter);
    if ('eventtype' in filterObj) {
      const obj = FILTER_EVENT_TYPES.find(
        item => item.value === filterObj.eventtype
      );
      filterObj.eventtype = obj.name;
    }
    return JSON.stringify(filterObj);
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
