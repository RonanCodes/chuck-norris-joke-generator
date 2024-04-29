import { TestBed } from '@angular/core/testing';

import { JokeStoreService } from './joke-store.service';

describe('JokeStoreService', () => {
  let service: JokeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
