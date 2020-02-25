import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector:
    'app-campaigns-details-messages-reports-sending-failed-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class SendingFailedReportTableComponent implements OnInit {
  columnHeaders: string[] = [
    'srNo',
    'messageTemplate',
    'messagesSent',
    'mobileClicks',
    'otherClicks',
    'cost',
    'revenue',
    'profit',
    'roi',
    'ctr',
  ];
  dataSource = [
    {
      srNo: 1,
      name: 'Name',
      processingStatus: 'failed',
      messagesSent: 3,
      mobileClicks: 4,
      otherClicks: 2,
      cost: 100,
      revenue: 1,
      profit: 10,
      roi: 0.23,
      ctr: 12,
      created: '06/01/1992',
    },
    {
      srNo: 1,
      name: 'Name',
      processingStatus: 'ready',
      messagesSent: 3,
      mobileClicks: 4,
      otherClicks: 2,
      cost: 100,
      revenue: 1,
      profit: 10,
      roi: 0.23,
      ctr: 12,
      created: '06/01/1992',
    },
  ];
  constructor() {}

  ngOnInit() {}

  getProcessingStatusColor(processingStatus: string) {
    switch (processingStatus) {
      case 'failed':
        return 'warn';
      case 'ready':
        return 'accent';
    }
  }
}
