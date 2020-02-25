import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MessageTemplateService } from 'app/shared/services/apis/message-template.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MessageTemplateEffects } from 'app/store/message-template/message-template.effects';
import { store } from 'app/store/message-template/message-template.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { MessageTemplateDetailComponent } from './detail/detail.component';
import { MessageTemplateComponent } from './message-template.component';
import { MessageTemplateRoutes } from './message-template.routing';
import { MessageTemplatePreviewComponent } from './preview-modal/preview-modal.component';
import { MessageTemplateEditModalComponent } from './table/edit-modal/edit-modal.component';
import { MessageTemplateTableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(MessageTemplateRoutes),

    StoreModule.forFeature(store.name, store.messageTemplateReducer),
    EffectsModule.forFeature([MessageTemplateEffects]),
  ],
  declarations: [
    MessageTemplateComponent,
    MessageTemplateTableComponent,
    MessageTemplateDetailComponent,
    MessageTemplateEditModalComponent,
    MessageTemplatePreviewComponent,
  ],
  providers: [MessageTemplateService],
  entryComponents: [
    MessageTemplateEditModalComponent,
    MessageTemplatePreviewComponent,
  ],
})
export class MessageTemplateModule {}
