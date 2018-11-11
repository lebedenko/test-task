import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { PageTitleService } from './shared/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  mQuery: MediaQueryList;
  title: string;

  navItems = [
    { url: 'home', label: 'Home', icon: 'home' },
    { url: 'chart', label: 'Chart', icon: 'pie_chart' },
    { url: 'table', label: 'Table', icon: 'table_chart' },
  ];

  private mqListener: () => void;

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(
    private cdr: ChangeDetectorRef,
    private mq: MediaMatcher,
    private pageTitle: PageTitleService
  ) {
    this.mQuery = mq.matchMedia('(max-width: 600px)');
    this.mqListener = () => cdr.detectChanges();
    this.mQuery.addListener(this.mqListener);
  }

  ngOnInit(): void {
    this.sidenav.toggle(true);
  }

  ngOnDestroy(): void {
    this.mQuery.removeListener(this.mqListener);
  }

  onPage(comp: any) {
    this.title = comp.title || '';
    this.pageTitle.title = this.title;
  }

}
