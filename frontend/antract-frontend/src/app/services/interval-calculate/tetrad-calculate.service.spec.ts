import { TestBed } from '@angular/core/testing';

import { TetradCalculateService } from './tetrad-calculate.service';

describe('TetradCalculateService', () => {
  let service: TetradCalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetradCalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
