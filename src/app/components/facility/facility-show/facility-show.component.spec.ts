import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityShowComponent } from './facility-show.component';

describe('FacilityShowComponent', () => {
  let component: FacilityShowComponent;
  let fixture: ComponentFixture<FacilityShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
