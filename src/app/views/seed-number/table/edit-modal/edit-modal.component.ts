import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-seed-number-table-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class SeedNumberEditModalComponent implements OnInit {
  public itemForm: FormGroup;
  public isActive: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SeedNumberEditModalComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      seedNumber: [item.seedNumber || '', Validators.required],
    });
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
