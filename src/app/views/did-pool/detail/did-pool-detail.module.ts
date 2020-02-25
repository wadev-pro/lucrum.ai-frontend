import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DidPoolDetailCopyPasteComponent } from './copy-paste/copy-paste.component';
import { DidPoolDetailComponent } from './detail.component';
import { DidPoolDetailRoutes } from './did-pool-detail.routing';
import { DidPoolDetailUploadsComponent } from './uploads/uploads.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(DidPoolDetailRoutes),
  ],
  declarations: [
    DidPoolDetailUploadsComponent,
    DidPoolDetailComponent,
    DidPoolDetailCopyPasteComponent,
  ],
  providers: [],
  entryComponents: [DidPoolDetailCopyPasteComponent],
})
export class DidPoolDetailModule {}
