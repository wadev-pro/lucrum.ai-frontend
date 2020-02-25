import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ResultPageComponent } from './result-page/result-page.component';
import { SearchViewRoutingModule } from './search-view-routing.module';

@NgModule({
  declarations: [ResultPageComponent],
  imports: [
    MatCardModule,
    CommonModule,
    NgxDatatableModule,
    SearchViewRoutingModule,
  ],
})
export class SearchViewModule {}
