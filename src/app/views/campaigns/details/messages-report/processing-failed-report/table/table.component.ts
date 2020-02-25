import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector:
    'app-campaigns-details-messages-report-processing-failed-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.style.css'],
  animations: egretAnimations,
})
export class ProcessingFailedReportTableComponent implements OnInit {
  columnHeaders: string[] = [
    'srNo',
    'craftedMessage',
    'messageTemplateGroup',
    'messageTemplate',
    'carrier',
    'personInfo',
    'exception',
  ];
  dataSource = [
    {
      srNo: 1,
      craftedMessage: 'Name',
      messageTemplateGroup: 'failed',
      messageTemplate: 3,
      carrier: 4,
      personInfo: 2,
      exception: 100,
    },
    {
      srNo: 1,
      craftedMessage: 'Name',
      messageTemplateGroup: 'failed',
      messageTemplate: 3,
      carrier: 4,
      personInfo: 2,
      exception: 100,
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
