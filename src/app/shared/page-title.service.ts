import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable()
export class PageTitleService {

  _title = '';
  get title(): string { return this._title; }

  set title(title: string) {
    this._title = title;

    if (title !== '') {
      title = `${title} | `;
    }

    this._docTitle.setTitle(`${title} Test task`);
  }

  constructor(private _docTitle: Title) {}

}
