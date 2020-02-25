import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.style.scss'],
  animations: egretAnimations,
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {}
}
