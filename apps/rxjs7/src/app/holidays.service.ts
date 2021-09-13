import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, share, shareReplay, tap } from 'rxjs';
import { Holiday } from './holiday';
import { holidayData } from './holiday-data';
import { HolidaysRequestCounter } from './holidays-request-counter';
import { withSharer } from './sharer';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  constructor(
    private httpClient: HttpClient,
    private holidaysRequestCounter: HolidaysRequestCounter
  ) {
    const source$ = this.httpClient.get<Holiday[]>('/assets/holidays.json');

    this._holidays$ = source$.pipe(
      tap(() => this.holidaysRequestCounter.increase()),
      share({
        connector: () => new ReplaySubject(),
        resetOnComplete: false,
        resetOnRefCountZero: false,
        resetOnError: false,
      })
    );

    // this._holidays$ = withSharer(
    //   source$.pipe(tap(() => this.holidaysRequestCounter.increase())),
    //   {
    //     connector: () => new ReplaySubject(),
    //     resetOnComplete: false,
    //     resetOnRefCountZero: false,
    //   }
    // );
  }

  private _holidays$: Observable<Holiday[]>;

  get holidays$(): Observable<Holiday[]> {
    return this._holidays$;
  }
}
