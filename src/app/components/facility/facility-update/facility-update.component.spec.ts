import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityUpdateComponent } from './facility-update.component';

describe('FacilityUpdateComponent', () => {
  let component: FacilityUpdateComponent;
  let fixture: ComponentFixture<FacilityUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
