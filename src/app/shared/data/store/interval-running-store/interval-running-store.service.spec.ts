import { TestBed } from '@angular/core/testing';

import { IntervalRunningStoreService } from './interval-running-store.service';
import { JokeStoreService } from '../joke-store/joke-store.service';
import { LocalStorageService } from '../../util/local-storage/local-storage.service';

describe('IntervalRunningStoreService', () => {
  let service: IntervalRunningStoreService;

  let jokeStoreService: jasmine.SpyObj<JokeStoreService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    jokeStoreService = jasmine.createSpyObj('JokeStoreService', [
      'triggerNewJoke',
    ]);

    localStorageService = jasmine.createSpyObj('LocalStorageService', [
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

  describe('#initStore()', () => {
    it('should emit the local stoarge pref for if the interval should run', (done) => {
      // Arrange
      localStorageService.getFromLocalStorage.and.returnValue('false');

      // Act
      service.initStore();

      // Assert
      service.isNewJokeIntervalRunning$.subscribe(
        (isNewJokeIntervalRunning) => {
          expect(isNewJokeIntervalRunning).toBeFalse();
          done();
        }
      );
    });
  });

  describe('#toggleInterval()', () => {
    [
      {
        description: 'should stop the interval',
        localStorageValue: 'true',
        expectedValue: false,
      },
      {
        description: 'should start a new interval joke timer',
        localStorageValue: 'false',
        expectedValue: true,
      },
    ].forEach((testCase) => {
      it(testCase.description, (done) => {
        // Arrange
        localStorageService.getFromLocalStorage.and.returnValue(
          testCase.localStorageValue
        );
        service.initStore();

        // Act
        service.toggleInterval();

        // Assert
        service.isNewJokeIntervalRunning$.subscribe(
          (isNewJokeIntervalRunning) => {
            expect(isNewJokeIntervalRunning).toBe(testCase.expectedValue);
            done();
          }
        );
      });
    });
  });
});
