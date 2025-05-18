import { TestBed } from '@angular/core/testing';

import { IntervalCalculateService } from './interval-calculate.service';

describe('IntervalCalculateService', () => {
  let service: IntervalCalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalCalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
