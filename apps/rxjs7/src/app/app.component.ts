import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { HolidaysRequestCounter } from './holidays-request-counter';
import { HolidaysService } from './holidays.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('httpCounter', [
      transition(':increment', [
        animate('500ms ease-out', style({ 'font-size': '4em' })),
        animate('500ms ease-out', style({ 'font-size': '1em' })),
      ]),
    ]),
  ],
})
export class AppComponent {
  counter = 0;
  constructor(holidaysRequestCounter: HolidaysRequestCounter) {
    holidaysRequestCounter.counter$.subscribe((counter) => {
      this.counter = counter;
    });
  }
}
