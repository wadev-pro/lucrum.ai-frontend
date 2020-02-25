import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-campaign-details-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.style.scss'],
  animations: egretAnimations,
})
export class StatisticsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
