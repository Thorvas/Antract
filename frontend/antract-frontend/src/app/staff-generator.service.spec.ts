import { TestBed } from '@angular/core/testing';

import { StaffGeneratorService } from './staff-generator.service';

describe('StaffGeneratorService', () => {
  let service: StaffGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
