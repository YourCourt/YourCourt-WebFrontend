import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtShowComponent } from './court-show.component';

describe('CourtShowComponent', () => {
  let component: CourtShowComponent;
  let fixture: ComponentFixture<CourtShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
