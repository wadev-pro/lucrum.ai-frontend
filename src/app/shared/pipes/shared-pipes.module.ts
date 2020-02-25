import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomCurrencyPipe } from './custom-currency.pipe';
import { CustomPercentPipe } from './custom-percent.pipe';
import { ExcerptPipe } from './excerpt.pipe';
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { MomentDatePipe } from './moment-date.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { RemoveLinebreakPipe } from './remove-linebreak.pipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe,
  RemoveLinebreakPipe,
  CustomCurrencyPipe,
  CustomPercentPipe,
  MomentDatePipe
];

@NgModule({
  imports: [CommonModule],
  declarations: pipes,
  exports: pipes,
})
export class SharedPipesModule {}
