import { TestBed } from '@angular/core/testing';

import { SharedObjectService } from './shared-object.service';

describe('SharedObjectService', () => {
  let service: SharedObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
