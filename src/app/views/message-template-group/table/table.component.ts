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
import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { AppState } from 'app/store/';
import * as actions from 'app/store/message-template-group/message-template-group.actions';
import {
  dataSelector,
  filterSelector,
} from 'app/store/message-template-group/message-template-group.selectors';
import { initialState } from 'app/store/message-template-group/message-template-group.states';
import { MessageTemplateGroupEditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-message-template-group-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class MessageTemplateGroupTableComponent implements OnInit, OnDestroy {
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

  public messageTemplateGroup$: Observable<any>;
  public filter$: Observable<any>;

  public messageTemplateGroups: Array<MessageTemplateGroup>;
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
    this.messageTemplateGroup$ = this.store$.select(dataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    combineLatest(this.filter$, this.messageTemplateGroup$)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, messageTemplateGroups]) => {
          this.applyFilter(messageTemplateGroups.slice(0), filter);
        })
      )
      .subscribe();
  }

  applyFilter(
    messageTemplateGroups: Array<MessageTemplateGroup>,
    filter: commonModels.Filter
  ) {
    this.offset = (filter.page - 1) * filter.per_page;
    if (
      !deepEqual(messageTemplateGroups, this.messageTemplateGroups) ||
      !deepEqual(filter, this.filter)
    ) {
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(messageTemplateGroups.length / filter.per_page);
      messageTemplateGroups = sortByFilter(filter, messageTemplateGroups);
      if (searchKey) {
        messageTemplateGroups = filterBySearch(
          searchKey,
          this.filterableFields,
          messageTemplateGroups
        );
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: messageTemplateGroups.length,
      };
      this.store$.dispatch(new actions.UpdateMeta(meta));

      this.messageTemplateGroups = messageTemplateGroups.slice(from, to);
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

  onEdit(item: MessageTemplateGroup) {
    const title = 'Edit Template Group';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      MessageTemplateGroupEditModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: item, type: 'edit' },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
      const payload = {
        ...item,
        ...res,
        lastUpdateBy: this.authenticationService$.getApiIdentification(),
        lastUpdateAt: getCurrentUTCTime(),
      };
      this.store$.dispatch(new actions.Update(payload));
    });
  }

  onDelete(item: MessageTemplateGroup) {
    this.confirmService$
      .confirm({ message: `Delete '${item.name}'?` })
      .subscribe(res => {
        if (res) {
          const payload = {
            ...item,
            lastUpdateBy: this.authenticationService$.getApiIdentification(),
            lastUpdateAt: getCurrentUTCTime(),
            isRemoved: true,
          };

          this.store$.dispatch(new actions.Delete(payload));
        }
      });
  }

  refreshTable() {
    this.changeDetectorRefs.detectChanges();
  }
}
