import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSupportComponent } from './vendor-support.component';

describe('VendorSupportComponent', () => {
  let component: VendorSupportComponent;
  let fixture: ComponentFixture<VendorSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
