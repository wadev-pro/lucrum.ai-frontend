import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';
import { BillingComponent } from './billing.component';
import { AddCardComponent } from './add-card/addCard.component';
import { NgxStripeModule } from 'ngx-stripe';
import { BillingRoutes } from './billing.routing';
import { AutoRechargeComponent } from './auto-recharge/autoRecharge.component';
import { AddFundsComponent } from './add-funds/addFunds.component';
import { HistoryTableComponent } from './payment-history/table/table.component';
import { HistoryComponent } from './payment-history/history.component'

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(BillingRoutes),
    NgxStripeModule
  ],
  declarations: [
    BillingComponent,
    AddCardComponent,
    AutoRechargeComponent,
    AddFundsComponent,
    HistoryTableComponent,
    HistoryComponent
  ],
  providers: [],
  entryComponents: [],
})
export class BillingModule {}
