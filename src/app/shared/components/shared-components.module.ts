import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxStripeModule } from 'ngx-stripe';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SearchModule } from '../search/search.module';
import { SharedMaterialModule } from '../shared-material.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ONLY FOR DEMO
import { CustomizerComponent } from './customizer/customizer.component';

// ALWAYS REQUIRED
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { CalendarComponent } from './calendar/calendar.component';
import {
  EgretSidebarComponent,
  EgretSidebarTogglerDirective,
} from './egret-sidebar/egret-sidebar.component';
import { EgretExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';
import { EgretExampleViewerComponent } from './example-viewer/example-viewer.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MatCardItemComponent } from './mat-card-item/item.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppLoaderComponent,
  CustomizerComponent,
  ButtonLoadingComponent,
  CalendarComponent,
  EgretSidebarComponent,
  EgretSidebarTogglerDirective,
  BottomSheetShareComponent,
  EgretExampleViewerComponent,
  EgretExampleViewerTemplateComponent,
  MatCardItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule,
    SatDatepickerModule,
    SatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule
  ],
  declarations: components,
  entryComponents: [
    AppComfirmComponent,
    AppLoaderComponent,
    BottomSheetShareComponent,
  ],
  exports: [
    TranslateModule,
    SatDatepickerModule,
    SatNativeDateModule,
    ...components,
  ],
})
export class SharedComponentsModule {}
