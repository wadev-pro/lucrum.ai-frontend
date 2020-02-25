import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, fromEvent, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { AppState } from './store';

import { AppLoaderService } from './shared/services/app-loader/app-loader.service';
import { LayoutService } from './shared/services/layout.service';
import { RoutePartsService } from './shared/services/route-parts.service';
import { processingSelector as campaignProcessingSelector } from './store/campaign/campaign.selectors';
import { processingSelector as didPoolProcessingSelector } from './store/did-pool/did-pool.selectors';
import { processingSelector as didProcessingSelector } from './store/did/did.selectors';
import { processingSelector as domainPoolsProcessingSelector } from './store/domain-pool/domain-pool.selectors';
import { ClearDetail as errorClearDetail } from './store/error/error.actions';
import { errorSelector } from './store/error/error.selectors';
import { processingSelector as templateGroupProcessingSelector } from './store/message-template-group/message-template-group.selectors';
import { processingSelector as templateProcessingSelector } from './store/message-template/message-template.selectors';
import { processingSelector as seedNumberProcessingSelector } from './store/seed-number/seed-number.selectors';
import { processingSelector as usersProcessingSelector } from './store/users/users.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  appTitle = 'Lucrum.ai';
  pageTitle = '';

  private onDestroy$ = new Subject<void>();
  campaignProcessing$: Observable<any>;
  messaageTemplateGroupProcessing$: Observable<any>;
  messaageTemplateProcessing$: Observable<any>;
  domainPoolsProcessing$: Observable<any>;
  didProcessing$: Observable<any>;
  didPoolProcessing$: Observable<any>;
  seedNumberProcessing$: Observable<any>;
  usersProcessing$: Observable<any>;

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private layout: LayoutService,
    private renderer: Renderer2,
    private loader$: AppLoaderService,
    private store$: Store<AppState>,
    private snack$: MatSnackBar
  ) {
    this.campaignProcessing$ = this.store$.select(campaignProcessingSelector);
    this.messaageTemplateGroupProcessing$ = this.store$.select(
      templateGroupProcessingSelector
    );
    this.messaageTemplateProcessing$ = this.store$.select(
      templateProcessingSelector
    );
    this.domainPoolsProcessing$ = this.store$.select(
      domainPoolsProcessingSelector
    );
    this.didPoolProcessing$ = this.store$.select(didPoolProcessingSelector);

    this.didProcessing$ = this.store$.select(didProcessingSelector);
    this.seedNumberProcessing$ = this.store$.select(
      seedNumberProcessingSelector
    );
    this.usersProcessing$ = this.store$.select(usersProcessingSelector);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterViewInit() {
    this.layout.applyMatTheme(this.renderer);
  }

  ngOnInit() {
    this.changePageTitle();

    combineLatest(
      this.messaageTemplateGroupProcessing$,
      this.domainPoolsProcessing$,
      this.messaageTemplateProcessing$,
      this.didProcessing$,
      this.didPoolProcessing$,
      this.seedNumberProcessing$,
      this.campaignProcessing$,
      this.usersProcessing$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([p1, p2, p3, p4, p5, p6, p7, p8]) => {
        if (p1 || p2 || p3 || p4 || p5 || p6 || p7 || p8) {
          this.loader$.open();
        } else {
          this.loader$.close();
        }
      });
    this.initErrorHandler();
  }

  initErrorHandler() {
    this.store$
      .select(errorSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(errors => {
          if (errors.length) {
            this.snack$.open(errors[0].message, 'OK', {
              duration: 4000,
            });
            this.store$.dispatch(new errorClearDetail());
          }
        })
      )
      .subscribe();
  }

  changePageTitle() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        const routeParts = this.routePartsService.generateRouteParts(
          this.activeRoute.snapshot
        );
        if (!routeParts.length) {
          return this.title.setTitle(this.appTitle);
        }
        // Extract title from parts;
        this.pageTitle = routeParts
          .reverse()
          .map(part => part.title)
          .reduce((partA, partI) => {
            return `${partA} > ${partI}`;
          });
        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
      });
  }
}
