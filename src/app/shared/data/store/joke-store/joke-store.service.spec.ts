import { TestBed } from '@angular/core/testing';

import { JokeStoreService } from './joke-store.service';
import { ChuckNorrisJokeGeneratorService } from '../../rest/chuck-norris-joke-generator/chuck-norris-joke-generator.service';
import { Joke } from './joke-store.model';
import { of } from 'rxjs';

describe('JokeStoreService', () => {
  let service: JokeStoreService;

  let chuckNorrisJokeGeneratorService: jasmine.SpyObj<ChuckNorrisJokeGeneratorService>;

  beforeEach(() => {
    chuckNorrisJokeGeneratorService = jasmine.createSpyObj(
      'ChuckNorrisJokeGeneratorService',
      ['getJoke'],
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ChuckNorrisJokeGeneratorService,
          useValue: chuckNorrisJokeGeneratorService,
        },
      ],
    });
    service = TestBed.inject(JokeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#initStore()', () => {
    it('should call the Chuck norris API 10 times, and emit on the store', (done) => {
      // Arrange
      const joke: Joke = {
        value: `Chuck Norris can lick his elbows.`,
        isFavourite: false,
      };
      chuckNorrisJokeGeneratorService.getJoke.and.returnValues(
        ...Array(12).fill(of(joke)),
      );

      // Act
      service.initStore();

      service.jokes$.subscribe((jokes) => {
        expect(jokes.length).toBe(10);
        done();
      });

      // Assert
      expect(chuckNorrisJokeGeneratorService.getJoke).toHaveBeenCalled();
    });
  });

  describe('#triggerNewJoke()', () => {
    it('should call the Chuck norris API 10 times, and emit on the store', (done) => {
      // Arrange
      const newJoke = {
        value: `Chuck Norris can lick his elbows.`,
        isFavourite: false,
      };
      chuckNorrisJokeGeneratorService.getJoke.and.returnValue(of(newJoke));

      // Act
      service.triggerNewJoke();

      service.jokes$.subscribe((jokes) => {
        expect(jokes[0]).toBe(newJoke);
        done();
      });

      // Assert
      expect(chuckNorrisJokeGeneratorService.getJoke).toHaveBeenCalledWith();
    });
  });
});
