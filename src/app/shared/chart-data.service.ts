import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ChartDataDailyResponse, ChartData, ChartMeta, ChartSeriesItem } from './chart-data.model';

export { ChartData, ChartMeta, ChartSeriesItem };

const API_URL = 'https://www.alphavantage.co/query?apikey=demo&function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT';

@Injectable()
export class ChartDataService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<ChartData> {
    return this.http.get<ChartDataDailyResponse>(API_URL)
      .pipe(
        map(res => new ChartData(res)),
        catchError(err => throwError(err.message))
      );
  }

}
