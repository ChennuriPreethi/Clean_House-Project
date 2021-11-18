import { TestBed } from '@angular/core/testing';

import { CleanHouseService } from './clean-house.service';

describe('CleanHouseService', () => {
  let service: CleanHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleanHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
