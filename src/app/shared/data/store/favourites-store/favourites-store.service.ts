import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../util/local-storage/local-storage.service';
import { Joke } from '../joke-store/joke-store.model';
import { localStorageKey } from '../../util/local-storage/local-storage.constant';

@Injectable({
  providedIn: 'root',
})
export class FavouritesStoreService {
  private _favourites$ = new BehaviorSubject<Joke[]>([]);

  public favourites$ = this._favourites$.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  public initStore(): void {
    const favourites = this.localStorageService.getFromLocalStorage(
      localStorageKey.favourites
    );

    if (favourites) {
      this._favourites$.next(JSON.parse(favourites));
    }
  }

  public addFavourite(joke: Joke): void {
    joke.isFavourite = true;
    // new jokes are added to the top of the list:
    this._favourites$.next([...this._favourites$.value, joke]);
    this.persistToLocalStorage();
  }

  public removeFavourite(joke: Joke): void {
    joke.isFavourite = false;

    this._favourites$.next(
      this._favourites$.value.filter(
        (favourite) => favourite.value !== joke.value
      )
    );
    this.persistToLocalStorage();
  }

  public toggleFavourite(joke: Joke): void {
    if (this.isFavourite(joke)) {
      this.removeFavourite(joke);
    } else {
      this.addFavourite(joke);
    }
  }

  private persistToLocalStorage(): void {
    this.localStorageService.saveToLocalStorage(
      localStorageKey.favourites,
      JSON.stringify(this._favourites$.value)
    );
  }

  private isFavourite(joke: Joke): boolean {
    return this._favourites$.value.includes(joke);
  }
}
