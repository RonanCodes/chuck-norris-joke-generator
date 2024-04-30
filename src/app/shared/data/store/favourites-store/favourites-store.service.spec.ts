import { TestBed } from '@angular/core/testing';

import { FavouritesStoreService } from './favourites-store.service';
import { LocalStorageService } from '../../util/local-storage/local-storage.service';
import { Joke } from '../joke-store/joke-store.model';
import { localStorageKey } from '../../util/local-storage/local-storage.constant';

describe('FavouritesStoreService', () => {
  let service: FavouritesStoreService;

  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let favouritesFromLocalStorage: string;
  let originalJoke: Joke;
  let newJoke: Joke;

  beforeEach(() => {
    originalJoke = { value: 'God prays to Chuck Norris', isFavourite: false };

    newJoke = {
      value: 'Chuck Norris can lick his elbows.',
      isFavourite: true,
    };
    favouritesFromLocalStorage = JSON.stringify([originalJoke]);

    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getFromLocalStorage',
      'saveToLocalStorage',
    ]);

    localStorageService.getFromLocalStorage.and.returnValue(
      favouritesFromLocalStorage
    );

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageService,
        },
      ],
    });
    service = TestBed.inject(FavouritesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('#favourites', () => {
  // it('should return an empty array', () => {
  //   // Arrange
  //   // Act
  //   // Assert
  // });
  // });

  describe('#initStore()', () => {
    it('should return an empty array', () => {
      // Act
      service.initStore();

      // Assert
      let favourites: Joke[] = [];
      service.favourites$.subscribe(
        (favouritesEvent) => (favourites = favouritesEvent)
      );
      expect(favourites[0]?.value).toBe('God prays to Chuck Norris');
    });
  });

  describe('#addFavourite()', () => {
    it('should return an empty array', (done) => {
      // Arrange
      service.initStore();

      // Act
      service.addFavourite(newJoke);

      service.favourites$.subscribe((favourites) => {
        expect(favourites[1].value).toBe(newJoke.value);
        done();
      });

      // Assert
      expect(newJoke.isFavourite).toBe(true);
      expect(localStorageService.saveToLocalStorage).toHaveBeenCalledWith(
        localStorageKey.favourites,
        JSON.stringify([originalJoke, newJoke])
      );
    });
  });

  // describe('#removeFavourite()', () => {
  //   it('should return an empty array', () => {
  //     // Arrange
  //     // Act
  //     // Assert
  //   });
  // });

  // describe('#toggleFavourite()', () => {
  //   it('should return an empty array', () => {
  //     // Arrange
  //     // Act
  //     // Assert
  //   });
  // });
});
