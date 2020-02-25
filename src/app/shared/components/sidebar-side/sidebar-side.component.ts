import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Profile } from 'app/shared/models/user.model';
import { ILayoutConf, LayoutService } from 'app/shared/services/layout.service';
import { AppState } from 'app/store';
import { GetUserInfo } from 'app/store/auth/authentication.action';
import { dataSelector } from 'app/store/auth/authentication.selector';
import { deepEqual } from 'assert';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html',
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  private onDestroy$ = new Subject<void>();

  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  public userProfile: Profile;

  role: number;
  constructor(
    private store: Store<AppState>,
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;

    combineLatest(
      this.navService.menuItems$,
      this.store$.select(state => state.authentication)
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([menuItem, userInfo]) => {
        this.menuItems = menuItem;
        if (userInfo.data.role !== 1) {
          this.menuItems = this.menuItems.filter(item => item.role !== 'admin');
        }
        // Checks item list has any icon type.
        this.hasIconTypeMenuItem = !!this.menuItems.filter(
          item => item.type === 'icon'
        ).length;
      });

    this.layoutConf = this.layout.layoutConf;

    this.store$
      .select(dataSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((profile: Profile) => (this.userProfile = profile))
      )
      .subscribe();
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (this.layoutConf.sidebarCompactToggle) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false,
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true,
      });
    }
  }
}
