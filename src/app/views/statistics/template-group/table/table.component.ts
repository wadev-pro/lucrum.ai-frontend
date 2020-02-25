import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { filterBySearch, sortByFilter } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import { AppState } from 'app/store/';
import * as actions from 'app/store/statistics/statistics.actions';
import {
  templateGroupListDataSelector,
  templateGroupListFilterSelector,
} from 'app/store/statistics/statistics.selectors';
import { initialState } from 'app/store/statistics/statistics.states';

@Component({
  selector: 'app-statistics-template-group-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class TemplateGroupTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = [
    'name',
    'createdAt',
    'lastUpdateAt',
    'isRemoved',
  ];

  columnHeaders: string[] = [
    'srNo',
    'name',
    'createdAt',
    'lastUpdateAt',
    'isRemoved',
    'actions',
  ];

  private onDestroy$ = new Subject<void>();

  public templateGroup$: Observable<any>;
  public filter$: Observable<any>;

  public templateGroups: Array<MessageTemplateGroup>;
  public filter: commonModels.Filter;
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.templateGroup$ = this.store$.select(templateGroupListDataSelector);
    this.filter$ = this.store$.select(templateGroupListFilterSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    combineLatest(this.filter$, this.templateGroup$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, templateGroup]) => {
          this.applyFilter(templateGroup.slice(0), filter);
        })
      )
      .subscribe();
  }

  applyFilter(
    templateGroup: Array<MessageTemplateGroup>,
    filter: commonModels.Filter
  ) {
    this.offset = (filter.page - 1) * filter.per_page;
    if (
      !deepEqual(templateGroup, this.templateGroups) ||
      !deepEqual(filter, this.filter)
    ) {
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(templateGroup.length / filter.per_page);
      templateGroup = sortByFilter(filter, templateGroup);
      if (searchKey) {
        templateGroup = filterBySearch(
          searchKey,
          this.filterableFields,
          templateGroup
        );
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: templateGroup.length,
      };
      this.store$.dispatch(new actions.UpdateTemplateGroupListMeta(meta));

      this.templateGroups = templateGroup.slice(from, to);
      this.changeDetectorRefs.detectChanges();
    }
  }

  sortData(event) {
    const updated_filter = {
      order_by: event.direction
        ? event.active
        : initialState.templateGroupListFilter.order_by,
      order_dir: event.direction
        ? event.direction
        : initialState.templateGroupListFilter.order_dir,
    };
    this.store$.dispatch(
      new actions.UpdateTemplateGroupListFilter(updated_filter)
    );
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
