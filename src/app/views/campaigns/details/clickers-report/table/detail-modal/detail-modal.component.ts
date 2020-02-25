import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Click } from 'app/shared/models/campaign-statistics.models';

@Component({
  selector: 'app-campaigns-details-clickers-report-default-table-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class CampaingClickerDetailModalComponent implements OnInit {
  public item: Click;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampaingClickerDetailModalComponent>
  ) {}

  ngOnInit() {
    this.item = this.data.payload;
  }
}
