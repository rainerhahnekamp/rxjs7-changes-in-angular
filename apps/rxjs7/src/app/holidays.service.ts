import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, share, Subject, tap, timer } from 'rxjs';
import { Holiday } from './holiday';
import { holidayData } from './holiday-data';
import { HolidaysRequestCounter } from './holidays-request-counter';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  private _holidays$ = new Observable((subscriber) => {
    window.setTimeout(() => subscriber.next(holidayData), 200);
  }).pipe(
    map(() => holidayData),
    tap(() => this.holidaysRequestCounter.increase()),
    share()
  );

  constructor(
    private httpClient: HttpClient,
    private holidaysRequestCounter: HolidaysRequestCounter
  ) {}

  get holidays$(): Observable<Holiday[]> {
    return this._holidays$;
  }
}
