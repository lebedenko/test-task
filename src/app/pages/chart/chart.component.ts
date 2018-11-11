import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';

import { ChartDataService, ChartMeta, ChartSeriesItem } from '../../shared/chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {

  title = 'Chart';
  meta: ChartMeta;
  series: ChartSeriesItem[];
  loading = false;
  error: string;

  get data() {
    return {
      chartType: 'Line',
      dataTable: this.getDataTable(),
      options: {
        legend: {position: 'none'},
        width: '100%'
      }
    };
  }

  constructor(
    private srv: ChartDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;

    this.srv.fetch().subscribe(data => {
      this.meta = data.getMeta();
      this.series = data.getSeries();
      this.loading = false;
      this.cdr.markForCheck();
    }, err => {
      this.loading = false;
      this.error = err;
      this.cdr.markForCheck();
    });
  }

  private getDataTable() {
    const dataTable = this.series.reduceRight((a, c) => {
      a.push([c.date, c.open]);
      return a;
    }, []);

    dataTable.unshift(['Date', 'USD']);

    return dataTable;
  }

}
