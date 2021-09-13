import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { filter, first, map, Observable } from 'rxjs';
import { Holiday } from '../holiday';
import { HolidaysService } from '../holidays.service';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss'],
})
export class HolidayDetailComponent implements OnInit {
  @Input() holidayId!: number;
  holiday$!: Observable<Holiday>;

  constructor(private holidaysService: HolidaysService) {}

  ngOnInit() {
    this.holiday$ = this.holidaysService.holidays$
      .pipe(
        map((holidays) =>
          holidays.find((holiday) => holiday.id === this.holidayId)
        )
      )
      .pipe(
        filter((holiday) => !!holiday),
        map((holiday) => holiday as Holiday),
        first()
      );
  }
}
