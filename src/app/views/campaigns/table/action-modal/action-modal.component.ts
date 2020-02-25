import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-campaign-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss'],
})
export class CampaignActionModalComponent implements OnInit {
  public itemForm: FormGroup;
  public type: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampaignActionModalComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.buildItemForm(this.data.payload);
    this.type = this.data.type;
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      batchSize: ['-1' || '', Validators.required],
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
