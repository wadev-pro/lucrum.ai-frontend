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
import { MessageTemplateGroupDetailComponent } from './detail/detail.component';
import { MessageTemplateGroupComponent } from './message-template-group.component';
import { MessageTemplateGroupRoutes } from './message-template-group.routing';
import { MessageTemplateGroupEditModalComponent } from './table/edit-modal/edit-modal.component';
import { MessageTemplateGroupTableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(MessageTemplateGroupRoutes),

    StoreModule.forFeature(store.name, store.messageTemplateGroupReducer),
    EffectsModule.forFeature([MessageTemplateGroupEffects]),
  ],
  declarations: [
    MessageTemplateGroupComponent,
    MessageTemplateGroupTableComponent,
    MessageTemplateGroupEditModalComponent,
    MessageTemplateGroupDetailComponent,
  ],
  providers: [MessageTemplateGroupService],
  entryComponents: [MessageTemplateGroupEditModalComponent],
})
export class MessageTemplateGroupModule {}
