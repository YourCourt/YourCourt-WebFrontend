import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionShowComponent } from './inscription-show.component';

describe('InscriptionShowComponent', () => {
  let component: InscriptionShowComponent;
  let fixture: ComponentFixture<InscriptionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
