import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileService } from 'app/shared/services/apis/file.service';
import { LeadService } from 'app/shared/services/apis/lead.service';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { LeadInfoComponent } from './lead-info/lead-info.component';
import { LeadRoutes } from './lead.routing';
import { LeadNumberLookupComponent } from './number-lookup/number-lookup.component';
import { ReportStatusComponent } from './report-status/report-status.component';
import { ReportStatusTableComponent } from './report-status/table/table.component';
import { ReportsComponent } from './report/report.component';
import { ReportsTableComponent } from './report/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(LeadRoutes),
  ],
  declarations: [
    LeadNumberLookupComponent,
    LeadInfoComponent,
    ReportsComponent,
    ReportsTableComponent,
    ReportStatusComponent,
    ReportStatusTableComponent,
  ],
  providers: [LeadService, FileService],
})
export class StatisticsModule {}
