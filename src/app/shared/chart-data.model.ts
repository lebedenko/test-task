export interface ChartDataDailyResponse {
  'Meta Data': ChartDataMetaRaw;
  'Time Series (Daily)': ChartDataSeriesRaw;
}

export interface ChartDataMetaRaw {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

export interface ChartDataSeriesRaw {
  [date: string]: ChartDataSeriesItemRaw;
}

export interface ChartDataSeriesItemRaw {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
  '8. split coefficient': string;
}

export interface ChartMeta {
  title: string;
  subTitle: string;
}

export interface ChartSeriesItem {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjustedClose: number;
  volume: number;
  dividendAmount: number;
  splitCoefficient: number;
}

export class ChartData {

  private meta: ChartMeta;
  private series: ChartSeriesItem[] = [];

  constructor(response: ChartDataDailyResponse) {
    this.createMeta(response['Meta Data']);
    this.createSeries(response['Time Series (Daily)']);
  }

  private createMeta(rawMeta: ChartDataMetaRaw) {
    this.meta = {
      title: rawMeta['1. Information'] || null,
      subTitle: rawMeta['2. Symbol'] || null
    };
  }

  private createSeries(rawSeries: ChartDataSeriesRaw) {
    Object.keys(rawSeries).forEach(date => {
      this.series.push({
        date,
        open: parseFloat(rawSeries[date]['1. open']),
        high: parseFloat(rawSeries[date]['2. high']),
        low: parseFloat(rawSeries[date]['3. low']),
        close: parseFloat(rawSeries[date]['4. close']),
        adjustedClose: parseFloat(rawSeries[date]['5. adjusted close']),
        volume: parseInt(rawSeries[date]['6. volume'], 10),
        dividendAmount: parseFloat(rawSeries[date]['7. dividend amount']),
        splitCoefficient: parseFloat(rawSeries[date]['8. split coefficient']),
      });
    });
  }

  getMeta() {
    return this.meta;
  }

  getSeries() {
    return this.series;
  }

}
