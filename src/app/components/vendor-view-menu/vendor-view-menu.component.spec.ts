import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewMenuComponent } from './vendor-view-menu.component';

describe('VendorViewMenuComponent', () => {
  let component: VendorViewMenuComponent;
  let fixture: ComponentFixture<VendorViewMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorViewMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorViewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
