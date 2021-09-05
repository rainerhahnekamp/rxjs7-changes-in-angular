import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayDetailComponent } from './holiday-detail.component';

describe('HolidayDetailComponent', () => {
  let component: HolidayDetailComponent;
  let fixture: ComponentFixture<HolidayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
