import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatSelect,
} from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, take, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AVAILABLE_TAGS } from 'app/core/constants';
import { MessageTemplateGroup } from 'app/shared/models/message-template-group.model';
import { MessageTemplate } from 'app/shared/models/message-template.model';
import { MessageTemplateService } from 'app/shared/services/apis/message-template.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store';
import { dataSelector } from 'app/store/message-template-group/message-template-group.selectors';
import { MessageTemplatePreviewComponent } from '../../preview-modal/preview-modal.component';

@Component({
  selector: 'app-message-template-table-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class MessageTemplateEditModalComponent implements OnInit, OnDestroy {
  @ViewChild('singleSelect') singleSelect: MatSelect;

  protected onDestroy$ = new Subject<void>();

  public itemForm: FormGroup;
  public isActive: boolean;
  public groupFilterCtrl: FormControl = new FormControl();
  public templateGroups: Array<MessageTemplateGroup>;
  public filteredTemplateGroups: Array<MessageTemplateGroup>;
  public availableTags: Array<any> = AVAILABLE_TAGS;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MessageTemplateEditModalComponent>,
    private fb: FormBuilder,
    private store$: Store<AppState>,
    private loader$: AppLoaderService,
    private dialog: MatDialog,
    private service$: MessageTemplateService,
    public confirmService$: AppConfirmService
  ) {}

  ngOnInit() {
    this.isActive = !this.data.payload.isRemoved;

    this.store$
      .select(dataSelector)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.templateGroups = data;
        this.filteredTemplateGroups = this.templateGroups.slice(0);
        this.buildItemForm(this.data.payload);
      });

    // listen for search field value changes
    this.groupFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterTemplateGroups();
      });
  }

  filterTemplateGroups() {
    if (!this.templateGroups) {
      return;
    }
    // get the search keyword
    let search = this.groupFilterCtrl.value;
    if (!search) {
      this.filteredTemplateGroups = this.templateGroups.slice(0);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTemplateGroups = this.templateGroups.filter(
      item => item.name.toLowerCase().indexOf(search) > -1
    );
  }

  buildItemForm(item: MessageTemplate) {
    let currentGroup = null;
    if (item.groupId) {
      currentGroup = this.templateGroups.find(
        t_item => t_item.groupId === item.groupId
      );
    }
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      templateGroup: [currentGroup || null, Validators.required],
      template: [item.template || '', Validators.required],
      isRemoved: [item.isRemoved || false, Validators.required],
    });
  }

  addTag(item) {
    const template = this.itemForm.value.template + ` ${item.value} `;
    this.itemForm.patchValue({ template });
  }

  submit() {
    const hasUnicodeCharacters = /[^\u0000-\u00ff]/.test(
      this.itemForm.value.template
    );

    if (!hasUnicodeCharacters) {
      this.saveTemplate();
      return;
    }

    this.confirmService$
      .confirm({
        title: 'Confirm Dialog',
        message: `We detected some unicode characters on your message.
        Are you sure you want to save it as is?`,
      })
      .subscribe(result => {
        if (result) {
          this.saveTemplate();
        }
      });
  }

  saveTemplate() {
    const result: MessageTemplate = {
      ...this.itemForm.value,
      isRemoved: !this.isActive,
      groupId: this.itemForm.value.templateGroup.groupId,
    };
    this.dialogRef.close(result);
  }

  previewTemplate() {
    this.loader$.open();
    this.service$
      .previewRawContent(encodeURIComponent(this.itemForm.value.template))
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        this.loader$.close();
        this.openPreviewModal(result);
      });
    return false;
  }

  openPreviewModal(message: string) {
    const title = 'Preview Message Template';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      MessageTemplatePreviewComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: message },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
