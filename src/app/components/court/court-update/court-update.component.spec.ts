import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtUpdateComponent } from './court-update.component';

describe('CourtUpdateComponent', () => {
  let component: CourtUpdateComponent;
  let fixture: ComponentFixture<CourtUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
