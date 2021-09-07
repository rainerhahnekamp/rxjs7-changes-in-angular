import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  delay,
  map,
  Observable,
  ReplaySubject,
  share,
  Subject,
  tap,
  timer,
} from 'rxjs';
import { Holiday } from './holiday';
import { holidayData } from './holiday-data';
import { HolidaysRequestCounter } from './holidays-request-counter';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  private _holidays$: Observable<Holiday[]>;

  constructor(
    private httpClient: HttpClient,
    private holidaysRequestCounter: HolidaysRequestCounter
  ) {
    const source$ = new Observable((subscriber) => {
      window.setTimeout(() => subscriber.next(holidayData), 200);
    });
    this._holidays$ = source$.pipe(
      map(() => holidayData),
      tap(() => this.holidaysRequestCounter.increase())
    );
  }

  get holidays$(): Observable<Holiday[]> {
    return this._holidays$;
  }
}
