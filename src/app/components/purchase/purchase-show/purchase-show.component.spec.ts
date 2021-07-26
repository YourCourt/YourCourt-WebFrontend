import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseShowComponent } from './purchase-show.component';

describe('PurchaseShowComponent', () => {
  let component: PurchaseShowComponent;
  let fixture: ComponentFixture<PurchaseShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
