import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardService } from 'app/shared/services/apis/dashboard.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { DashboardEffects } from 'app/store/dashboard/dashboard.effects';
import { store } from 'app/store/dashboard/dashboard.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { ComposerComponent } from './composer.component';
import { ComposerRoutes } from './composer.routing';
import { ComposerPreviewModalComponent } from './preview-modal/preview-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(ComposerRoutes),

    StoreModule.forFeature(store.name, store.dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  declarations: [ComposerComponent, ComposerPreviewModalComponent],
  providers: [DashboardService],
  entryComponents: [ComposerPreviewModalComponent],
})
export class ComposerModule {}
