import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GchartComponent} from './gchart.component';
import {GchartsLoaderService} from './gcharts-loader.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    GchartComponent,
  ],
  exports: [
    GchartComponent,
  ],
  providers: [GchartsLoaderService]
})
export class GchartsModule {}
