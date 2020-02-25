import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutes } from './statistics.routing';
import { TldTableComponent } from './tld/table/table.component';
import { TldComponent } from './tld/tld.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(StatisticsRoutes),
  ],
  declarations: [StatisticsComponent, TldComponent, TldTableComponent],
  providers: [],
})
export class StatisticsModule {}
