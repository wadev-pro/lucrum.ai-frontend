import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-campaigns-details-messages-report-filtered-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class FilteredReportTableComponent implements OnInit {
  columnHeaders: string[] = [
    'srNo',
    'tld',
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
