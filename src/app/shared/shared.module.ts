import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

// SERVICES
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';
import { AnonymousGuard } from './services/auth/anonymous.guard';
import { AuthGuard } from './services/auth/auth.guard';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';
import { ThemeService } from './services/theme.service';

import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { AuthService } from './services/auth/auth.service';
import { FormService } from './services/form.service';
import { LocalStorageService } from './services/local-storage.service';

const modules = [
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  NgxDatatableModule,
  SatDatepickerModule,
  SatNativeDateModule,
];
@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    ...modules,
  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    AnonymousGuard,
    AppConfirmService,
    AppLoaderService,
    AuthService,
    LocalStorageService,
    FormService,
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    ...modules,
  ],
})
export class SharedModule {}
