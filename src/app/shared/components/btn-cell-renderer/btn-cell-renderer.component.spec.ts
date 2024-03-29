import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellRendererComponent } from './btn-cell-renderer.component';

describe('BtnCellRendererComponent', () => {
  let component: BtnCellRendererComponent;
  let fixture: ComponentFixture<BtnCellRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnCellRendererComponent]
    });
    fixture = TestBed.createComponent(BtnCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
