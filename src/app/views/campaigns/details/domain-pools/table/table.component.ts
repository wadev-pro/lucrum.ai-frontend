import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { filterBySearch, sortByFilter } from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { DomainPool } from 'app/shared/models/domain-pool.models';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppState } from 'app/store/';
import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';
import * as actions from 'app/store/domain-pool/domain-pool.actions';
import {
  dataSelector,
  filterSelector,
} from 'app/store/domain-pool/domain-pool.selectors';
import { initialState } from 'app/store/domain-pool/domain-pool.states';
import { DomainPoolEditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-campaigns-details-domain-pools-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class DomainPoolsTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = ['domain'];

  columnHeaders: string[] = ['srNo', 'domain', 'actions'];

  private onDestroy$ = new Subject<void>();

  public campaignId$: Observable<any>;
  public domain$: Observable<any>;
  public filter$: Observable<any>;

  public campaign_id: string;
  public filter: commonModels.Filter;
  public domains: Array<DomainPool> = [];
  public offset: number;

  constructor(
    private store$: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private confirmService$: AppConfirmService
  ) {
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.domain$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.offset = 0;
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
    combineLatest(this.filter$, this.domain$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, domains]) => {
          this.applyFilter(domains.slice(0), filter);
        })
      )
      .subscribe();
  }

  applyFilter(domains: Array<DomainPool>, filter: commonModels.Filter) {
    this.offset = (filter.page - 1) * filter.per_page;
    if (!deepEqual(domains, this.domains) || !deepEqual(filter, this.filter)) {
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(domains.length / filter.per_page);
      domains = sortByFilter(filter, domains);
      if (searchKey) {
        domains = filterBySearch(searchKey, this.filterableFields, domains);
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: domains.length,
      };
      this.store$.dispatch(new actions.UpdateMeta(meta));

      this.domains = domains.slice(from, to);
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

  onEditDomain(data, index) {
    const title = 'Edit Domain';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DomainPoolEditModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: data, type: 'edit' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const payload = {
        campaign_id: this.campaign_id,
        index: index,
        domain: res,
      };
      this.store$.dispatch(new actions.EditDomain(payload));
    });
  }

  onDeleteDomain(data, index) {
    this.confirmService$
      .confirm({ message: `Delete Domain '${data.domain}'?` })
      .subscribe(res => {
        if (res) {
          const payload = {
            campaign_id: this.campaign_id,
            id: index,
          };

          this.store$.dispatch(new actions.DeleteDomain(payload));
        }
      });
  }
}
