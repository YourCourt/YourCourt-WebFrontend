import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionUpdateComponent } from './inscription-update.component';

describe('InscriptionUpdateComponent', () => {
  let component: InscriptionUpdateComponent;
  let fixture: ComponentFixture<InscriptionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
