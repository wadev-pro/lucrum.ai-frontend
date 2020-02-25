import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-template-group-table-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class MessageTemplateGroupEditModalComponent implements OnInit {
  public itemForm: FormGroup;
  public isActive: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MessageTemplateGroupEditModalComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.buildItemForm(this.data.payload);
    this.isActive = !this.data.payload.isRemoved;
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      isRemoved: [item.isRemoved || false, Validators.required],
      isReplyBackGroup: [item.isReplyBackGroup === true]
    });
  }

  submit() {
    this.itemForm.controls['isRemoved'].setValue(!this.isActive);
    this.dialogRef.close(this.itemForm.value);
  }
}
