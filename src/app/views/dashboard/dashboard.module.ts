import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardService } from 'app/shared/services/apis/dashboard.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { DashboardEffects } from 'app/store/dashboard/dashboard.effects';
import { store } from 'app/store/dashboard/dashboard.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(DashboardRoutes),

    StoreModule.forFeature(store.name, store.dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService],
})
export class DashboardModule {}
