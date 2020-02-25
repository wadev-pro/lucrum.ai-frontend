import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DidPoolService } from 'app/shared/services/apis/did-pool.service';
import { DidUploadService } from 'app/shared/services/apis/did-upload.service';
import { DidsService } from 'app/shared/services/apis/dids.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { DidPoolEffects } from 'app/store/did-pool/did-pool.effects';
import { store } from 'app/store/did-pool/did-pool.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { DidPoolComponent } from './did-pool.component';
import { DidPoolRoutes } from './did-pool.routing';
import { DidPoolTableEditModalComponent } from './table/edit-modal/edit-modal.component';
import { DidPoolTableComponent } from './table/table.component';
import { DidPoolTableUploadModalComponent } from './table/upload-modal/upload-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(DidPoolRoutes),

    StoreModule.forFeature(store.name, store.didPoolReducer),
    EffectsModule.forFeature([DidPoolEffects]),
  ],
  declarations: [
    DidPoolComponent,
    DidPoolTableComponent,
    DidPoolTableEditModalComponent,
    DidPoolTableUploadModalComponent,
  ],
  providers: [DidPoolService, DidsService, DidUploadService],
  entryComponents: [
    DidPoolTableEditModalComponent,
    DidPoolTableUploadModalComponent,
  ],
})
export class DidPoolModule {}
