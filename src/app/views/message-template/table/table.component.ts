import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as deepEqual from 'deep-equal';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import {
  filterBySearch,
  getBoolColor,
  getCurrentUTCTime,
  sortByFilter,
} from 'app/shared/helpers/utils';
import * as commonModels from 'app/shared/models/common.model';
import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import { MessageTemplate } from 'app/shared/models/message-template.model';
import { AppState } from 'app/store/';
import { dataSelector as templateGroupDataSelector } from 'app/store/message-template-group/message-template-group.selectors';
import * as actions from 'app/store/message-template/message-template.actions';
import {
  dataSelector,
  filterSelector,
} from 'app/store/message-template/message-template.selectors';

import { MatDialog, MatDialogRef } from '@angular/material';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { initialState } from 'app/store/message-template/message-template.states';
import { MessageTemplateEditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-message-template-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.scss'],
  animations: egretAnimations,
})
export class MessageTemplateTableComponent implements OnInit, OnDestroy {
  filterableFields: string[] = [
    'name',
    'template',
    'templateGroup',
    'createdAt',
    'lastUpdateAt',
    'isRemoved',
  ];

  columnHeaders: string[] = [
    'srNo',
    'name',
    'templateGroup',
    'template',
    'createdAt',
    'lastUpdateAt',
    'isRemoved',
    'actions',
  ];

  private onDestroy$ = new Subject<void>();

  public messageTemplate$: Observable<any>;
  public messageTemplateGroup$: Observable<any>;
  public filter$: Observable<any>;

  public messageTemplates: Array<MessageTemplate>;
  public messageTemplateGroup: Array<MessageTemplateGroup>;
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
    this.messageTemplate$ = this.store$.select(dataSelector);
    this.messageTemplateGroup$ = this.store$.select(templateGroupDataSelector);
    this.filter$ = this.store$.select(filterSelector);
    this.offset = 0;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    combineLatest(
      this.filter$,
      this.messageTemplate$,
      this.messageTemplateGroup$
    )
      .pipe(
        takeUntil(this.onDestroy$),
        tap(([filter, messageTemplates, messateTemplateGroups]) => {
          this.applyFilter(
            messageTemplates.slice(0),
            messateTemplateGroups,
            filter
          );
        })
      )
      .subscribe();
  }

  applyFilter(
    messageTemplates: Array<MessageTemplate>,
    messateTemplateGroups: Array<MessageTemplateGroup>,
    filter: commonModels.Filter
  ) {
    this.offset = (filter.page - 1) * filter.per_page;

    if (
      !deepEqual(messageTemplates, this.messageTemplates) ||
      !deepEqual(filter, this.filter)
    ) {
      messageTemplates = messageTemplates.map(item => {
        const templateGroupItem: MessageTemplateGroup = messateTemplateGroups.find(
          item1 => item1.groupId === item.groupId
        );
        return {
          ...item,
          templateGroup: (templateGroupItem && templateGroupItem.name) || '',
        };
      });
      const searchKey = filter.search.trim(),
        from = (filter.page - 1) * filter.per_page,
        to = filter.page * filter.per_page,
        last_page = Math.ceil(messageTemplates.length / filter.per_page);
      messageTemplates = sortByFilter(filter, messageTemplates);
      if (searchKey) {
        messageTemplates = filterBySearch(
          searchKey,
          this.filterableFields,
          messageTemplates
        );
      }

      const meta: commonModels.Meta = {
        current_page: filter.page,
        from,
        last_page,
        path: '',
        per_page: filter.per_page,
        to,
        total: messageTemplates.length,
      };
      this.store$.dispatch(new actions.UpdateMeta(meta));

      this.messageTemplates = messageTemplates.slice(from, to);
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

  onEdit(item: MessageTemplate) {
    const title = 'Edit Message Template';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      MessageTemplateEditModalComponent,
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

  onDelete(item: MessageTemplate) {
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
