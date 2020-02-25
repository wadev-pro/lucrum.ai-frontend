import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-did-pool-detail-copy-paste',
  templateUrl: './copy-paste.component.html',
  styleUrls: ['./copy-paste.component.scss'],
})
export class DidPoolDetailCopyPasteComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DidPoolDetailCopyPasteComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      dids: ['', Validators.required],
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
