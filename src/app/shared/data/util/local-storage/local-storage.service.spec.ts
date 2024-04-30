import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { localStorageKey } from './local-storage.constant';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#saveToLocalStorage()', () => {
    it('should save a list to storage', () => {
      // Arrange
      const stringifiedFavourites = JSON.stringify([
        { value: 'God prays to Chuck Norris', isFavourite: true },
      ]);

      // Act
      service.saveToLocalStorage(
        localStorageKey.favourites,
        stringifiedFavourites,
      );

      // Assert
      const result = localStorage.getItem(localStorageKey.favourites);

      expect(result).toBe(stringifiedFavourites);
    });
  });

  describe('#getFromLocalStorage()', () => {
    it('should return the list from storage', () => {
      // Arrange
      const stringifiedFavourites = JSON.stringify([
        { value: 'God prays to Chuck Norris', isFavourite: true },
      ]);
      localStorage.setItem(localStorageKey.favourites, stringifiedFavourites);

      // Act
      const result = service.getFromLocalStorage(localStorageKey.favourites);

      // Assert
      expect(result).toBe(stringifiedFavourites);
    });
  });
});
