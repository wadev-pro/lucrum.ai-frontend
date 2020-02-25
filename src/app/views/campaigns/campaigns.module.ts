import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CampaignService } from 'app/shared/services/apis/campaign.service';
import { CarrierBlackListService } from 'app/shared/services/apis/carrier-black-list.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { CampaignEffects } from 'app/store/campaign/campaign.effects';
import { store } from 'app/store/campaign/campaign.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutes } from './campaigns.routing';
import { CampaignCloneComponent } from './clone/clone.component';
import { CampaignClonePreviewModalComponent } from './clone/preview-modal/preview-modal.component';
import { CampaignEditComponent } from './edit/edit.component';
import { CampaignEditPreviewModalComponent } from './edit/preview-modal/preview-modal.component';
import { CampaignActionModalComponent } from './table/action-modal/action-modal.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(CampaignsRoutes),

    StoreModule.forFeature(store.name, store.campaignReducer),
    EffectsModule.forFeature([CampaignEffects]),
  ],
  declarations: [
    CampaignsComponent,
    TableComponent,
    CampaignEditComponent,
    CampaignEditPreviewModalComponent,
    CampaignCloneComponent,
    CampaignClonePreviewModalComponent,
    CampaignActionModalComponent,
  ],
  providers: [CampaignService, CarrierBlackListService],
  entryComponents: [
    CampaignEditPreviewModalComponent,
    CampaignClonePreviewModalComponent,
    CampaignActionModalComponent,
  ],
})
export class CampaignsModule {}
