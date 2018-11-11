declare var google: any;

import {Injectable, EventEmitter, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class GchartsLoaderService {

  private chartPackage: { [id: string]: string } = {
    AnnotationChart: 'annotationchart',
    AreaChart: 'corechart',
    Bar: 'bar',
    BarChart: 'corechart',
    BubbleChart: 'corechart',
    Calendar: 'calendar',
    CandlestickChart: 'corechart',
    ColumnChart: 'corechart',
    ComboChart: 'corechart',
    PieChart: 'corechart',
    Gantt: 'gantt',
    Gauge: 'gauge',
    GeoChart: 'geochart',
    Histogram: 'corechart',
    Line: 'line',
    LineChart: 'corechart',
    Map: 'map',
    OrgChart: 'orgchart',
    Sankey: 'sankey',
    Scatter: 'scatter',
    ScatterChart: 'corechart',
    SteppedAreaChart: 'corechart',
    Table: 'table',
    Timeline: 'timeline',
    TreeMap: 'treemap',
    WordTree: 'wordtree'
  };

  private _gScriptLoadingNotifier: EventEmitter<boolean> = new EventEmitter();
  private _gScriptIsLoading = false;

  constructor(@Inject(DOCUMENT) private _doc) {}

  load(renderer: Renderer2, chartType: string): Promise<any> {
    return new Promise((resolve: any = Function.prototype) => {
      this._loadScript(renderer).then(() => {
        google.charts.load('current', {
          packages: [this.chartPackage[chartType]],
          callback: resolve
        });
      });
    });
  }

  private _loadScript(renderer: Renderer2): Promise<any> {
    return new Promise((resolve: any = Function.prototype, reject: any = Function.prototype) => {
      if (typeof google !== 'undefined' && google.charts) {
        resolve();
      } else if (!this._gScriptIsLoading) {
        this._gScriptIsLoading = true;

        const script = renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this._gScriptIsLoading = false;
          this._gScriptLoadingNotifier.emit(true);
          resolve();
        };
        script.onerror = () => {
          this._gScriptIsLoading = false;
          this._gScriptLoadingNotifier.emit(false);
          reject();
        };
        renderer.appendChild(this._doc.body, script);
      } else {
        this._gScriptLoadingNotifier.subscribe((loaded: boolean) => {
          if (loaded) {
            resolve();
          } else {
            reject();
          }
        });
      }
    });
  }
}
