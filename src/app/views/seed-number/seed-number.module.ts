import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MessageTemplateGroupService } from 'app/shared/services/apis/message-template-group.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MessageTemplateGroupEffects } from 'app/store/message-template-group/message-template-group.effects';
import { store } from 'app/store/message-template-group/message-template-group.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { SeedNumberComponent } from './seed-number.component';
import { SeedNumberRoutes } from './seed-number.routing';
import { SeedNumberEditModalComponent } from './table/edit-modal/edit-modal.component';
import { SeedNumberTableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(SeedNumberRoutes),

    StoreModule.forFeature(store.name, store.messageTemplateGroupReducer),
    EffectsModule.forFeature([MessageTemplateGroupEffects]),
  ],
  declarations: [
    SeedNumberComponent,
    SeedNumberTableComponent,
    SeedNumberEditModalComponent,
  ],
  providers: [MessageTemplateGroupService],
  entryComponents: [SeedNumberEditModalComponent],
})
export class SeedNumberModule {}
