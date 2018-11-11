declare var google: any;

import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  HostListener,
  SimpleChanges,
  EventEmitter,
  Renderer2
} from '@angular/core';

import {GchartsLoaderService} from './gcharts-loader.service';
import {GchartReadyEvent} from './events/gchart-ready';
import {GchartErrorEvent} from './events/gchart-error';

@Component({
  selector: 'app-g-chart',
  template: '<div class="g-chart-wrapper"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GchartComponent implements OnChanges, OnDestroy {

  @Input() public data: any;

  @Output() ready: EventEmitter<GchartReadyEvent> = new EventEmitter();
  @Output() error: EventEmitter<GchartErrorEvent> = new EventEmitter();

  private _wrapper: any;

  @HostListener('window:resize')
  onResize() {
    this.redraw();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private loader: GchartsLoaderService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data || !this.data || !this.data.chartType) { return; }
    this.loader
      .load(this.renderer, this.data.chartType)
      .then(() => {
        if (!this._wrapper || this._wrapper.getChartType() !== this.data.chartType) {
          this._wrapper = new google.visualization.ChartWrapper(this.data);
        } else {
          this._unregisterChartEvents();
          this._wrapper.setDataTable(this.data.dataTable);
          this._wrapper.setOptions(this.data.options);
        }
        this._registerWrapperEvents();
        this.redraw();
      });
  }

  ngOnDestroy() {
    if (this._wrapper) {
      const chart = this._wrapper.getChart();

      if (chart) { chart.clearChart(); }
    }
  }

  redraw() {
    this._reformat();
    this._wrapper.draw(this.el.nativeElement.querySelector('div.g-chart-wrapper'));
  }

  private _reformat() {
    if (!this.data) { return; }

    if (typeof this.data.formatters !== 'undefined') {
      for (const formatterConfig of this.data.formatters) {
        const formatterConstructor = google.visualization[formatterConfig.type];
        const formatterOptions = formatterConfig.options;
        const formatter = new formatterConstructor(formatterOptions);

        for (const col of formatterConfig.columns) {
          formatter.format(this._wrapper.getDataTable(), col);
        }
      }
    }
  }

  private _unregisterChartEvents() {
    google.visualization.events.removeAllListeners(this._wrapper);
  }

  private _registerWrapperEvents() {
    google.visualization.events.addListener(this._wrapper, 'ready', () => {
      this.ready.emit({message: 'Chart ready'});
    });

    google.visualization.events.addListener(this._wrapper, 'error', (err: GchartErrorEvent) => {
      google.visualization.errors.removeError(err.id);
      this.error.emit(err);
    });
  }

}
