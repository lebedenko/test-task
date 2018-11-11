import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/chart/chart.component';
import { TableComponent } from './pages/table/table.component';
import { PageTitleService } from './shared/page-title.service';
import { ChartDataService } from './shared/chart-data.service';
import { GchartsModule } from '././shared/gcharts/gcharts.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    GchartsModule,
  ],
  providers: [
    PageTitleService,
    ChartDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
