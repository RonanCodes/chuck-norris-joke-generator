import { TestBed } from '@angular/core/testing';

import { IntervalRunningStoreService } from './interval-running-store.service';
import { JokeStoreService } from '../joke-store/joke-store.service';
import { LocalStorageService } from '../../util/local-storage/local-storage.service';

describe('IntervalRunningStoreService', () => {
  let service: IntervalRunningStoreService;

  beforeEach(() => {
    const jokeStoreService = jasmine.createSpyObj('JokeStoreService', [
      'triggerNewJoke',
    ]);

    const localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'saveToLocalStorage',
      'getFromLocalStorage',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: JokeStoreService,
          useValue: jokeStoreService,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageService,
        },
      ],
    });
    service = TestBed.inject(IntervalRunningStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
