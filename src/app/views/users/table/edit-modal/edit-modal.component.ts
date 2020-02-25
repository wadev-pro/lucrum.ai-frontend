import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-users-table-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class UsersEditModalComponent implements OnInit {
  public itemForm: FormGroup;
  public type: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsersEditModalComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.type = this.data.type;
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(item: User) {
    const formFields = {
      name: [item.name || '', Validators.required],
      first_name: [item.first_name || '', Validators.required],
      last_name: [item.last_name || ''],
      email: [item.email || '', Validators.required],
      mtMessageWithLinkPrice: [Number(item.mtMessageWithLinkPrice) || ''],
      mtMessageWithoutLinkPrice: [Number(item.mtMessageWithoutLinkPrice) || ''],
      mtUserRouteFee: [Number(item.mtUserRouteFee) || ''],
      didPrice: [Number(item.didPrice) || ''],
      balance: [item.balance || 0],
      addCredits: ['']
    };
    if (this.type === 'add') {
      formFields['password'] = [item.password || '', Validators.required];
    } else {
      formFields['password'] = [item.password || ''];
    }
    this.itemForm = this.fb.group(formFields);
  }

  submit() {
    this.dialogRef.close(this.itemForm.value);
  }
}
