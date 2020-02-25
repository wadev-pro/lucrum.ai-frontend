import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Conversion } from 'app/shared/models/campaign-statistics.models';

@Component({
  selector: 'app-campaigns-details-conversion-report-default-table-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class CampaingConversionDetailModalComponent implements OnInit {
  public item: Conversion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampaingConversionDetailModalComponent>
  ) {}

  ngOnInit() {
    this.item = this.data.payload;
  }
}
