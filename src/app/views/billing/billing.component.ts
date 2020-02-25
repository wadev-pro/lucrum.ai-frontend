import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations: egretAnimations,
})
export class BillingComponent implements OnInit {
  index = 0;
  view = 1;

  public search = '';

  constructor() {
  }

  ngOnInit() {
  }
}
