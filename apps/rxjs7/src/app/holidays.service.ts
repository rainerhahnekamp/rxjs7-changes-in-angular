import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Holiday } from './holiday';
import { holidayData } from './holiday-data';
import { HolidaysRequestCounter } from './holidays-request-counter';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  constructor(
    private httpClient: HttpClient,
    private holidaysRequestCounter: HolidaysRequestCounter
  ) {
    const source$ = new Observable<Holiday[]>((subscriber) => {
      window.setTimeout(() => subscriber.next(holidayData), 200);
    });
    this._holidays$ = source$.pipe(
      tap(() => this.holidaysRequestCounter.increase())
    );
  }

  private _holidays$: Observable<Holiday[]>;

  get holidays$(): Observable<Holiday[]> {
    return this._holidays$;
  }
}
