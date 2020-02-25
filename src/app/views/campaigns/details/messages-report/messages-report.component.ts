import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-campaign-details-messages-report',
  templateUrl: './messages-report.component.html',
  styleUrls: ['./messages-report.style.scss'],
  animations: egretAnimations,
})
export class MessagesReportComponent implements OnInit {
  dataSource: any = [
    {
      status: 'success',
      eventName: 'Campaign Created Event',
      date: '23-05-2019 12:31 PM',
      shortDescription:
        'CampaignCreatedEvent, Timestamp=5/23/2019 12:31:18 PM +00:00, DoneBy=toni.bilan0428@gmail.com, CampaignId=571e0395-e294-4aaf-836d-3f17d661ce68',
      doneBy: 'toni.bilan0428@gmail.com',
    },
    {
      status: 'success',
      eventName: 'Campaign Validation Started Event',
      date: '23-05-2019 12:31 PM',
      shortDescription:
        'CampaignValidationStartedEvent, Timestamp=5/23/2019 12:31:19 PM +00:00, DoneBy=System, CampaignId=571e0395-e294-4aaf-836d-3f17d661ce68',
      doneBy: 'System',
    },
    {
      status: 'success',
      eventName: 'Campaign Validation Complete Event',
      date: '23-05-2019 12:31 PM',
      shortDescription:
        'CampaignValidationCompleteEvent, Timestamp=5/23/2019 12:31:18 PM +00:00, DoneBy=toni.bilan0428@gmail.com, CampaignId=571e0395-e294-4aaf-836d-3f17d661ce68',
      doneBy: 'System',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
