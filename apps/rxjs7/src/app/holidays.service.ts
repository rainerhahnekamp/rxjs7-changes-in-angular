import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, share, tap } from 'rxjs';
import { Holiday } from './holiday';
import { holidayData } from './holiday-data';
import { HolidaysRequestCounter } from './holidays-request-counter';
import { myShare } from './my-share';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  constructor(
    private httpClient: HttpClient,
    private holidaysRequestCounter: HolidaysRequestCounter
  ) {
    let firstRun = true;
    const source$ = httpClient.get<Holiday[]>('/assets/holidays.json');
    this._holidays$ = source$.pipe(
      tap(() => {
        if (firstRun) {
          firstRun = false;
          throw new Error('something happened');
        }
        this.holidaysRequestCounter.increase();
      }),
      share({
        connector: () => new ReplaySubject(),
        resetOnComplete: false,
        resetOnRefCountZero: false,
        resetOnError: true,
      })
    );
  }

  private _holidays$: Observable<Holiday[]>;

  get holidays$(): Observable<Holiday[]> {
    return this._holidays$;
  }
}
