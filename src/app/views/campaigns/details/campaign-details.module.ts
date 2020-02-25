import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';
import { CampaignDetailEffects } from 'app/store/campaign-detail/campaign-detail.effects';
import { store } from 'app/store/campaign-detail/campaign-detail.index';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { CampaignDetailsRoutes } from './campaign-details.routing';
import { ClickersReportComponent } from './clickers-report/clickers-report.component';
import { CampaingClickerDetailModalComponent } from './clickers-report/table/detail-modal/detail-modal.component';
import { ClickersReportTableComponent } from './clickers-report/table/table.component';
import { CampaignConversionReportComponent } from './conversion-report/conversion-report.component';
import { CampaingConversionDetailModalComponent } from './conversion-report/table/detail-modal/detail-modal.component';
import { CampaignCenversionReportTableComponent } from './conversion-report/table/table.component';
import { CampaignDetailsComponent } from './details.component';
import { DomainPoolsComponent } from './domain-pools/domain-pools.component';
import { DomainPoolEditModalComponent } from './domain-pools/table/edit-modal/edit-modal.component';
import { DomainPoolsTableComponent } from './domain-pools/table/table.component';
import { EventsHistoryComponent } from './events-history/events-history.component';
import { InformationComponent } from './information/information.component';
import { DefaultComponent } from './messages-report/default/default.component';
import { CampaingMessageDetailModalComponent } from './messages-report/default/table/detail-modal/detail-modal.component';
import { DefaultTableComponent } from './messages-report/default/table/table.component';
import { FilteredReportComponent } from './messages-report/filtered-report/filtered-report.component';
import { FilteredReportTableComponent } from './messages-report/filtered-report/table/table.component';
import { MessagesReportComponent } from './messages-report/messages-report.component';
import { ProcessingFailedReportComponent } from './messages-report/processing-failed-report/processing-failed-report';
import { ProcessingFailedReportTableComponent } from './messages-report/processing-failed-report/table/table.component';
import { SendingFailedReportComponent } from './messages-report/sending-failed-report/sending-failed-report.component';
import { SendingFailedReportTableComponent } from './messages-report/sending-failed-report/table/table.component';
import { CarrierStatisticsComponent } from './statistics/carrier-statistics/carrier-statistics.component';
import { CarrierStatisticsTableComponent } from './statistics/carrier-statistics/table/table.component';
import { DidStatisticsComponent } from './statistics/did-statistics/did-statistics.component';
import { DidStatisticsTableComponent } from './statistics/did-statistics/table/table.component';
import { MessageCountsComponent } from './statistics/message-counts/message-counts.component';
import { MessageTemplatesStatisticsComponent } from './statistics/message-templates-statistics/message-templates-statistics.component';
import { MessageTemplatesStatisticsTableComponent } from './statistics/message-templates-statistics/table/table.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TldStatisticsTableComponent } from './statistics/tld-statistics/table/table.component';
import { TldStatisticsComponent } from './statistics/tld-statistics/tld-statistics.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,

    RouterModule.forChild(CampaignDetailsRoutes),
    StoreModule.forFeature(store.name, store.campaignDetailReducer),
    EffectsModule.forFeature([CampaignDetailEffects]),
  ],
  declarations: [
    CampaignDetailsComponent,
    CarrierStatisticsComponent,
    CarrierStatisticsTableComponent,
    DidStatisticsComponent,
    DidStatisticsTableComponent,
    MessageTemplatesStatisticsComponent,
    MessageTemplatesStatisticsTableComponent,
    TldStatisticsComponent,
    TldStatisticsTableComponent,
    InformationComponent,
    EventsHistoryComponent,
    StatisticsComponent,
    MessageCountsComponent,
    DomainPoolsComponent,
    DomainPoolsTableComponent,
    DomainPoolEditModalComponent,
    MessagesReportComponent,
    DefaultComponent,
    DefaultTableComponent,
    ProcessingFailedReportComponent,
    ProcessingFailedReportTableComponent,
    FilteredReportComponent,
    FilteredReportTableComponent,
    SendingFailedReportComponent,
    SendingFailedReportTableComponent,
    ClickersReportComponent,
    ClickersReportTableComponent,
    CampaignConversionReportComponent,
    CampaignCenversionReportTableComponent,
    CampaingMessageDetailModalComponent,
    CampaingClickerDetailModalComponent,
    CampaingConversionDetailModalComponent,
  ],
  entryComponents: [
    DomainPoolEditModalComponent,
    CampaingMessageDetailModalComponent,
    CampaingClickerDetailModalComponent,
    CampaingConversionDetailModalComponent,
  ],
})
export class CampaignDetailsModule {}
