import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { ChartDataService, ChartMeta, ChartSeriesItem } from '../../shared/chart-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  title = 'Table';
  displayedColumns = [];
  dataSource: MatTableDataSource<ChartSeriesItem>;
  meta: ChartMeta;
  series: ChartSeriesItem[];
  loading = false;
  error: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private srv: ChartDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;

    this.srv.fetch().subscribe(data => {
      this.meta = data.getMeta();
      this.series = data.getSeries();
      this.dataSource.data = this.series;
      this.displayedColumns = ['date', 'open', 'high', 'low', 'close', 'adjusted', 'volume', 'dividend', 'splitCoefficient'];
      this.loading = false;
      this.cdr.markForCheck();
    }, err => {
      this.loading = false;
      this.error = err;
      this.cdr.markForCheck();
    });
  }

}
