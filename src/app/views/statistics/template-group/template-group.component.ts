import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import * as moment from 'moment-timezone';
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
import * as commonModels from 'app/shared/models/common.model';
import { TablePagination } from 'app/shared/models/common.model';
import { AppState } from 'app/store/';
import * as StatisticsActions from 'app/store/statistics/statistics.actions';
import { initialState } from 'app/store/statistics/statistics.states';

import {
  templateGroupListDidFetchSelector,
  templateGroupListFetchingSelector,
  templateGroupListFilterSelector,
  templateGroupListMetaSelector,
} from 'app/store/statistics/statistics.selectors';

@Component({
  selector: 'app-statistics-template-group',
  templateUrl: './template-group.component.html',
  styleUrls: ['./template-group.style.css'],
  animations: egretAnimations,
})
export class TemplateGroupComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;
  public fetching$: Observable<any>;

  public filter: commonModels.Filter;
  public meta: commonModels.Meta;
  public daterrange = {
    begin: null,
    end: null,
  };
  public search = '';

  public pagination: TablePagination = {
    length: initialState.templateGroupListMeta.total,
    pageIndex: initialState.templateGroupListFilter.page,
    pageSize: initialState.templateGroupListFilter.per_page,
    previousPageIndex: 0,
  };

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs$: ChangeDetectorRef
  ) {
    this.filter$ = this.store$.select(templateGroupListFilterSelector);
    this.meta$ = this.store$.select(templateGroupListMetaSelector);
    this.didFetch$ = this.store$.select(templateGroupListDidFetchSelector);
    this.fetching$ = this.store$.select(templateGroupListFetchingSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
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
    this.didFetch$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.loadData())
      )
      .subscribe();
  }

  loadData() {
    this.store$.dispatch(new StatisticsActions.GetTemplateGroupList());
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
    this.store$.dispatch(
      new StatisticsActions.UpdateTemplateGroupListFilter(updated_filter)
    );
  }

  onPaginateChange(event) {
    const data = {
      page: event.pageIndex + 1,
      per_page: event.pageSize,
    };
    this.updateFilter(data);
  }
}
