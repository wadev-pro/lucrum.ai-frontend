import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import {
  filterBySearch,
  getBoolColor,
  sortByFilter,
} from 'app/shared/helpers/utils';
import { getCurrentUTCTime } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { SeedNumber } from 'app/shared/models/seed-number.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/seed-number/seed-number.actions';
import {
  dataSelector,
  filterSelector,
} from 'app/store/seed-number/seed-number.selectors';
import { initialState } from 'app/store/seed-number/seed-number.states';
import { SeedNumberEditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-seed-number-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class SeedNumberTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = ['seedNumber'];

  columnHeaders: string[] = ['srNo', 'seedNumber', 'actions'];

  private onDestroy$ = new Subject<void>();

  public seedNumber$: Observable<any>;
  public filter$: Observable<any>;

  public seedNumbers: Array<SeedNumber> = [];
  public filter: commonModels.Filter;
  public offset: number;
  getBoolColor = getBoolColor;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmService$: AppConfirmService,
    private authenticationService$: AuthService
  ) {
    this.seedNumber$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    combineLatest(this.filter$, this.seedNumber$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, seedNumbers]) => {
          this.applyFilter(seedNumbers.slice(0), filter);
        })
      )
      .subscribe();
  }

  applyFilter(seedNumbers: Array<SeedNumber>, filter: commonModels.Filter) {
    this.offset = (filter.page - 1) * filter.per_page;
    if (
      !deepEqual(seedNumbers, this.seedNumbers) ||
      !deepEqual(filter, this.filter)
    ) {
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(seedNumbers.length / filter.per_page);
      seedNumbers = sortByFilter(filter, seedNumbers);
      if (searchKey) {
        seedNumbers = filterBySearch(
          searchKey,
          this.filterableFields,
          seedNumbers
        );
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: seedNumbers.length,
      };
      this.store$.dispatch(new actions.UpdateMeta(meta));

      this.seedNumbers = seedNumbers.slice(from, to);
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

  onDelete(item: SeedNumber) {
    this.confirmService$
      .confirm({ message: `Delete '${item.seedNumber}'?` })
      .subscribe(res => {
        if (res) {
          this.store$.dispatch(new actions.Delete(item.seedNumber));
        }
      });
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
