import { Injectable } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HolidaysRequestCounter {
  private _counter = 0;
  private _counter$ = new BehaviorSubject<number>(this._counter);

  get counter$() {
    return this._counter$.asObservable();
  }

  increase() {
    this._counter$.next(++this._counter);
  }
}
