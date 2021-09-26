import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { filter, first, map, Observable, tap } from 'rxjs';
import { Holiday } from '../holiday';
import { HolidaysService } from '../holidays.service';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss'],
})
export class HolidayDetailComponent {
  @Input() holidayId!: number;
  holiday$: Observable<Holiday> = this.holidaysService.holidays$.pipe(
    map((holidays) =>
      holidays.find((holiday) => holiday.id === this.holidayId)
    ),
    this.filterHoliday
  );

  constructor(private holidaysService: HolidaysService) {}

  filterHoliday(source$: Observable<Holiday | undefined>) {
    return source$.pipe(
      filter((holiday) => !!holiday),
      map((holiday) => {
        console.log(holiday);
        isHoliday(holiday);
        return holiday;
      })
    );
  }
}

function isHoliday(holiday: Holiday | undefined): asserts holiday is Holiday {
  if (holiday === undefined) {
    throw new Error('no valid holiday');
  }
}
