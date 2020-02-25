import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppState } from 'app/store/';

import { Filter, Lead } from 'app/shared/models/reports.model';
import * as ReportsActions from 'app/store/report/report.actions';
import {
  leadDataSelector,
  leadDidFetchSelector,
  leadFilterSelector,
} from 'app/store/report/report.selectors';
import { initialState } from 'app/store/report/report.states';

@Component({
  selector: 'app-lead-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class ReportsTableComponent implements OnInit, OnDestroy {
  columnHeaders: string[] = [
    'srNo',
    'firstName',
    'lastName',
    'email',
    'phone',
    'city',
    'state',
    'zip',
  ];

  sortableFields: object = {};

  private onDestroy$ = new Subject<void>();

  public lead$: Observable<any>;
  public didFetch$: Observable<any>;

  public leads: Array<Lead>[];
  public filter: Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.lead$ = this.store$.select(leadDataSelector);
    this.didFetch$ = this.store$.select(leadDidFetchSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.lead$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(leads => {
          if (!deepEqual(this.leads, leads)) {
            this.leads = leads;
            this.refreshTable();
          }
        })
      )
      .subscribe();

    this.store$
      .select(leadFilterSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(filter => {
          this.filter = filter;
          this.offset = (filter.page - 1) * filter.per_page;
        })
      )
      .subscribe();
  }

  sortData(event) {}

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
