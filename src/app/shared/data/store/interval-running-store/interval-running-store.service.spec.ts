import { TestBed } from '@angular/core/testing';

import { IntervalRunningStoreService } from './interval-running-store.service';

describe('IntervalRunningStoreService', () => {
  let service: IntervalRunningStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalRunningStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
