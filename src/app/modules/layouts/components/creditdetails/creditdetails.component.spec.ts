import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditdetailsComponent } from './creditdetails.component';

describe('CreditdetailsComponent', () => {
  let component: CreditdetailsComponent;
  let fixture: ComponentFixture<CreditdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditdetailsComponent]
    });
    fixture = TestBed.createComponent(CreditdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});