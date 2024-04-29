import { TestBed } from '@angular/core/testing';

import { FavouritesStoreService } from './favourites-store.service';

describe('FavouritesStoreService', () => {
  let service: FavouritesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
