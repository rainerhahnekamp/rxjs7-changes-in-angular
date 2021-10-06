import { Component } from '@angular/core';
import { first, Observable, retry } from 'rxjs';
import { Holiday } from '../holiday';
import { HolidaysService } from '../holidays.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent {
  holidays$: Observable<Holiday[]>;

  constructor(holidaysService: HolidaysService) {
    this.holidays$ = holidaysService.holidays$.pipe(
      retry({ delay: 2500 }),
      first()
    );
  }
}
