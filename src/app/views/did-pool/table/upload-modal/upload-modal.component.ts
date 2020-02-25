import {
  Component,
  ElementRef,
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
  MatDialogRef,
  MatSelect,
  MatTabGroup,
} from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CURRENCIES } from 'app/core/constants';
import { MessageGatewayProvider } from 'app/shared/models/message-gateway-provider.model';
import { AppState } from 'app/store';
import { dataSelector } from 'app/store/gateway-provider/gateway-provider.selectors';

@Component({
  selector: 'app-did-pool-table-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
})
export class DidPoolTableUploadModalComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  @ViewChild('inputFile') inputFile: ElementRef;

  protected onDestroy$ = new Subject<void>();

  public copyPasteForm: FormGroup;
  public fileSelected: any;
  public fileName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DidPoolTableUploadModalComponent>,
    private fb: FormBuilder,
    private store$: Store<AppState>
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {
    this.copyPasteForm = this.fb.group({
      dids: ['', Validators.required],
    });
  }

  onFileSelect() {
    this.inputFile.nativeElement.click();
  }

  fileChangeEvent($e) {
    if ($e.srcElement && $e.srcElement.files && $e.srcElement.files.length) {
      this.fileSelected = $e.srcElement.files[0];
      this.fileName = this.fileSelected.name;
    }
  }

  isUploadable() {
    let result = false;
    const selectedTab = this.tabGroup.selectedIndex;
    if (selectedTab === 0) {
      if (this.fileSelected) {
        result = true;
      }
    } else {
      if (this.copyPasteForm.valid) {
        result = true;
      }
    }
    return result;
  }

  submit() {
    const payload = {
      type: this.tabGroup.selectedIndex,
      filename: this.fileSelected,
      dids: this.copyPasteForm.value.dids,
    };
    this.dialogRef.close(payload);
  }
}
