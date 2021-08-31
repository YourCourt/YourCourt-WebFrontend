import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingShowComponent } from './booking-show.component';

describe('BookingShowComponent', () => {
  let component: BookingShowComponent;
  let fixture: ComponentFixture<BookingShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
