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
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/domain-pool/domain-pool.actions';
import { initialState } from 'app/store/domain-pool/domain-pool.states';
import { DomainPoolEditModalComponent } from './table/edit-modal/edit-modal.component';

import { campaignIdSelector } from 'app/store/campaign-detail/campaign-detail.selectors';
import {
  didFetchSelector,
  filterSelector,
  metaSelector,
} from 'app/store/domain-pool/domain-pool.selectors';

@Component({
  selector: 'app-campaign-details-domain-pools',
  templateUrl: './domain-pools.component.html',
  styleUrls: ['./domain-pools.style.css'],
  animations: egretAnimations,
})
export class DomainPoolsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  private onDestroy$ = new Subject<void>();

  public campaignId$: Observable<any>;
  public filter$: Observable<any>;
  public meta$: Observable<any>;
  public didFetch$: Observable<any>;

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
    private confirmService$: AppConfirmService
  ) {
    this.campaignId$ = this.store$.select(campaignIdSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.meta$ = this.store$.select(metaSelector);
    this.didFetch$ = this.store$.select(didFetchSelector);
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
        debounceTime(200),
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
    const payload = {
      campaign_id: this.campaign_id,
      filter: this.filter,
    };
    this.store$.dispatch(new actions.GetList(payload));
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

  onAddDomain() {
    const title = 'Add Domain';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DomainPoolEditModalComponent,
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
      let domains = _.map(res.domain.split('\n'), (item: string) => {
        return {
          domain: item.trim(),
        };
      });
      domains = _.filter(domains, item => item.domain);
      const payload = {
        campaign_id: this.campaign_id,
        domain: domains,
      };
      this.store$.dispatch(new actions.AddDomain(payload));
    });
  }

  onDeleteAll() {
    this.confirmService$
      .confirm({ message: `Delete All Domains?` })
      .subscribe(res => {
        if (res) {
          const payload = {
            campaign_id: this.campaign_id,
            id: null,
          };
          this.store$.dispatch(new actions.DeleteDomain(payload));
        }
      });
  }
}
