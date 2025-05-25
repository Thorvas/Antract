import { TestBed } from '@angular/core/testing';

import { FifthCalculateService } from './fifth-calculate.service';

describe('FifthCalculateService', () => {
  let service: FifthCalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FifthCalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
