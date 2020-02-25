import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { TemplateGroupDetailComponent } from './detail/template-group-detail.component';
import { TemplateGroupTableComponent } from './table/table.component';
import { TemplateGroupComponent } from './template-group.component';
import { StatisticsTemplateGroupRoutes } from './template-group.routing';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(StatisticsTemplateGroupRoutes),
  ],
  declarations: [
    TemplateGroupComponent,
    TemplateGroupTableComponent,
    TemplateGroupDetailComponent,
  ],
  providers: [],
})
export class StatisticsTemplateGroupModule {}
