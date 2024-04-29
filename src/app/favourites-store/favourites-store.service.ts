import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesStoreService {
  private _favourites$ = new BehaviorSubject<string[]>([]);

  public favourites$ = this._favourites$.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  public addFavourite(joke: string): void {
    this._favourites$.next([...this._favourites$.value, joke]);
    this.persistToLocalStorage();
  }

  public removeFavourite(joke: string): void {
    this._favourites$.next(
      this._favourites$.value.filter((favourite) => favourite !== joke)
    );
    this.persistToLocalStorage();
  }

  public initStore(): void {
    const favourites =
      this.localStorageService.getFromLocalStorage('favourites');

    if (favourites) {
      this._favourites$.next(JSON.parse(favourites));
    }
  }

  private persistToLocalStorage(): void {
    this.localStorageService.saveToLocalStorage(
      'favourites',
      JSON.stringify(this._favourites$.value)
    );
  }
}
