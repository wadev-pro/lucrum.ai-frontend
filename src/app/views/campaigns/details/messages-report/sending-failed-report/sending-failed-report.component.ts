import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-campaign-details-messages-report-sending-failed-report',
  templateUrl: './sending-failed-report.component.html',
  styleUrls: ['./sending-failed-report.style.css'],
  animations: egretAnimations,
})
export class SendingFailedReportComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
