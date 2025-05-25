import { TestBed } from '@angular/core/testing';

import { TriadCalculateService } from './triad-calculate.service';

describe('TriadCalculateService', () => {
  let service: TriadCalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriadCalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
