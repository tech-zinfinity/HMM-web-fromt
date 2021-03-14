import { TestBed } from '@angular/core/testing';

import { HotelOperationsService } from './hotel-operations.service';

describe('HotelOperationsService', () => {
  let service: HotelOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
