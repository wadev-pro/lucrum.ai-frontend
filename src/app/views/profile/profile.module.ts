import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MessageTemplateGroupEffects } from 'app/store/message-template-group/message-template-group.effects';
import { store } from 'app/store/message-template-group/message-template-group.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';
import { ProfileOverviewEditComponent } from './overview-edit/overview-edit.component';
import { ProfileOverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(ProfileRoutes),

    StoreModule.forFeature(store.name, store.messageTemplateGroupReducer),
    EffectsModule.forFeature([MessageTemplateGroupEffects]),
  ],
  declarations: [
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileOverviewEditComponent,
    SettingsComponent,
  ],
  providers: [],
  entryComponents: [],
})
export class ProfileModule {}
