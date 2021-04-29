import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRevenueDashboardComponent } from './vendor-revenue-dashboard.component';

describe('VendorRevenueDashboardComponent', () => {
  let component: VendorRevenueDashboardComponent;
  let fixture: ComponentFixture<VendorRevenueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorRevenueDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRevenueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
