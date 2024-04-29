import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  public toggleFavourite(joke: string): void {
    if (this.isFavourite(joke)) {
      this.removeFavourite(joke);
    } else {
      this.addFavourite(joke);
    }
  }

  private isFavourite(joke: string): boolean {
    return this._favourites$.value.includes(joke);
  }
}
