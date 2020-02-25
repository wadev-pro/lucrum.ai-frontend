import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import * as _ from 'underscore';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FILTER_EVENT_TYPES, STATE_LIST } from 'app/core/constants';
import { FILE as FILE_ERROR } from 'app/core/errors';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import * as commonModels from 'app/shared/models/common.model';
import * as reportsModels from 'app/shared/models/reports.model';
import { FileService } from 'app/shared/services/apis/file.service';
import { ReportsService } from 'app/shared/services/apis/reports.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import {
  DateTimeService,
  IDateRangeSelection,
} from 'app/shared/services/date-time.service';
import { AppState } from 'app/store/';
import { AddError } from 'app/store/error/error.actions';
import * as ReportsActions from 'app/store/report/report.actions';
import {
  leadDidFetchSelector,
  leadFetchingSelector,
  leadFilterSelector,
  leadMetaSelector,
} from 'app/store/report/report.selectors';
import { initialState } from 'app/store/report/report.states';

@Component({
  selector: 'app-lead-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.style.css'],
  animations: egretAnimations,
})
export class ReportsComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;

  public filter: reportsModels.Filter;
  public meta: commonModels.Meta;
  public daterrange = {
    begin: null,
    end: null,
  };

  public pagination: commonModels.TablePagination = {
    length: initialState.leadMeta.total,
    pageIndex: initialState.leadFilter.page,
    pageSize: initialState.leadFilter.per_page,
    previousPageIndex: 0,
  };

  public filterForm: FormGroup;
  public stateFilterCtrl: FormControl = new FormControl();
  public filteredStates: Array<object>;
  public filterEventList = FILTER_EVENT_TYPES;
  public stateList = STATE_LIST;

  constructor(
    private store$: Store<AppState>,
    private fileService$: FileService,
    private reportService$: ReportsService,
    private changeDetectorRefs$: ChangeDetectorRef,
    private fb: FormBuilder,
    private loader$: AppLoaderService,
    private snack$: MatSnackBar,
    private router$: Router
  ) {
    this.filter$ = this.store$.select(leadFilterSelector);
    this.meta$ = this.store$.select(leadMetaSelector);
    this.didFetch$ = this.store$.select(leadDidFetchSelector);
    this.fetching$ = this.store$.select(leadFetchingSelector);

    this.filterForm = this.fb.group({
      vertical: [''],
      fileowner: [''],
      carrier: [''],
      eventtype: [null],
      gender: [null],
      state: [null],
      city: [''],
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.filteredStates = this.stateList.slice(0);
    // listen for search field value changes
    this.stateFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterStates();
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

  filterStates() {
    if (!this.stateList) {
      return;
    }
    // get the search keyword
    let search = this.stateFilterCtrl.value;
    if (!search) {
      this.filteredStates = this.stateList.slice(0);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredStates = this.stateList.filter(
      item => item.label.toLowerCase().indexOf(search) > -1
    );
  }

  loadData() {
    const payload = {
      filter: this.filter,
    };
    this.store$.dispatch(new ReportsActions.GetLead(payload));
  }

  initMeta() {
    this.pagination.length = this.meta.total;
    this.pagination.pageIndex = this.meta.current_page - 1;
    this.pagination.pageSize = this.meta.per_page;
    this.changeDetectorRefs$.detectChanges();
  }

  initFilter() {
    this.daterrange = {
      begin: new Date(this.filter.start_date),
      end: new Date(this.filter.end_date),
    };

    this.filterForm.controls['vertical'].setValue(this.filter.filter.vertical);
    this.filterForm.controls['fileowner'].setValue(
      this.filter.filter.fileowner
    );
    this.filterForm.controls['carrier'].setValue(this.filter.filter.carrier);
    this.filterForm.controls['eventtype'].setValue(
      this.filter.filter.eventtype
    );
    this.filterForm.controls['state'].setValue(this.filter.filter.state);
    this.filterForm.controls['city'].setValue(this.filter.filter.city);
  }

  onCalendarChange(selectedDateRange: IDateRangeSelection) {
    this.daterrange = DateTimeService.getDateRangeFromSelection(
      selectedDateRange
    );
  }

  updateFilter(data) {
    const updated_filter = {
      ...this.filter,
      ...data,
    };
    this.store$.dispatch(new ReportsActions.UpdateLeadFilter(updated_filter));
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }

  getLeadFilter() {
    const leadFilter: reportsModels.LeadFilter = {};
    if (this.filterForm.value.vertical) {
      leadFilter.vertical = this.filterForm.value.vertical;
    }
    if (this.filterForm.value.fileowner) {
      leadFilter.fileowner = this.filterForm.value.fileowner;
    }
    if (this.filterForm.value.carrier) {
      leadFilter.carrier = this.filterForm.value.carrier;
    }
    if (this.filterForm.value.eventtype) {
      leadFilter.eventtype = this.filterForm.value.eventtype;
    }
    if (this.filterForm.value.state) {
      leadFilter.state = this.filterForm.value.state;
    }
    if (this.filterForm.value.city) {
      leadFilter.city = this.filterForm.value.city;
    }
    return leadFilter;
  }

  filterSubmit() {
    const newFilter = {
      start_date: this.daterrange.begin,
      end_date: this.daterrange.end,
      filter: this.getLeadFilter(),
    };
    this.updateFilter(newFilter);
  }

  export() {
    const leadFilter: reportsModels.LeadFilter = this.getLeadFilter();
    const filter = {
      start_date: this.daterrange.begin,
      end_date: this.daterrange.end,
      filter: leadFilter,
    };
    this.loader$.open();
    this.reportService$
      .exportLeadReport(filter)
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        this.snack$.open('Exporting is started!', 'OK', {
          duration: 4000,
        });
        this.loader$.close();
        this.router$.navigateByUrl('lead/files');
      });
  }
}
