import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageSent } from 'app/shared/models/campaign-statistics.models';

@Component({
  selector: 'app-campaigns-details-messages-report-default-table-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class CampaingMessageDetailModalComponent implements OnInit {
  public item: MessageSent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampaingMessageDetailModalComponent>
  ) {}

  ngOnInit() {
    this.item = this.data.payload;
  }
}
