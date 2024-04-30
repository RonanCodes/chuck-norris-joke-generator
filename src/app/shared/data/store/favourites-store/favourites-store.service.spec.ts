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
    originalJoke = { value: 'God prays to Chuck Norris', isFavourite: true };

    newJoke = {
      value: 'Chuck Norris can lick his elbows.',
      isFavourite: false,
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
    service.initStore();
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
      // Assert
      let favourites: Joke[] = [];
      service.favourites$.subscribe(
        (favouritesEvent) => (favourites = favouritesEvent)
      );
      expect(favourites[0]?.value).toBe('God prays to Chuck Norris');
    });
  });

  describe('#addFavourite()', () => {
    it('should add the favourite', (done) => {
      // Act
      service.addFavourite(newJoke);

      service.favourites$.subscribe((favourites) => {
        expect(favourites[0].value).toBe(newJoke.value);
        done();
      });

      // Assert
      expect(newJoke.isFavourite).toBe(true);
      expect(localStorageService.saveToLocalStorage).toHaveBeenCalledWith(
        localStorageKey.favourites,
        JSON.stringify([newJoke, originalJoke])
      );
    });
  });

  describe('#removeFavourite()', () => {
    it('should remove the favourite', (done) => {
      // Act
      service.removeFavourite(originalJoke);

      service.favourites$.subscribe((favourites) => {
        expect(favourites.length).toBe(0);
        done();
      });

      // Assert
      expect(originalJoke.isFavourite).toBe(false);
      expect(localStorageService.saveToLocalStorage).toHaveBeenCalledWith(
        localStorageKey.favourites,
        JSON.stringify([])
      );
    });
  });

  describe('#toggleFavourite()', () => {
    it('should remove the joke', (done) => {
      // Act
      service.toggleFavourite(originalJoke);

      service.favourites$.subscribe((favourites) => {
        expect(favourites.length).toBe(0);
        done();
      });

      // Assert
      expect(originalJoke.isFavourite).toBe(false);
      expect(localStorageService.saveToLocalStorage).toHaveBeenCalledWith(
        localStorageKey.favourites,
        JSON.stringify([])
      );
    });

    it('should add the joke', (done) => {
      // Act
      service.toggleFavourite(newJoke);

      service.favourites$.subscribe((favourites) => {
        expect(favourites.length).toBe(2);
        done();
      });

      // Assert
      expect(originalJoke.isFavourite).toBe(true);
      expect(localStorageService.saveToLocalStorage).toHaveBeenCalledWith(
        localStorageKey.favourites,
        JSON.stringify([newJoke, originalJoke])
      );
    });
  });
});
