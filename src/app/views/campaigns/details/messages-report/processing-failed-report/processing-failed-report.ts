import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-campaign-details-messages-report-processing-failed-report',
  templateUrl: './processing-failed-report.component.html',
  styleUrls: ['./processing-failed-report.style.css'],
  animations: egretAnimations,
})
export class ProcessingFailedReportComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
