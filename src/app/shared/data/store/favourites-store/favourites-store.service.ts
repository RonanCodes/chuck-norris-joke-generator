import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../util/local-storage/local-storage.service';
import { Joke } from '../../rest/chuck-norris-joke-generator/chuck-norris-joke-generator.model';

@Injectable({
  providedIn: 'root',
})
export class FavouritesStoreService {
  // This should just be a filtered list on top of the joke store.
  private _favourites$ = new BehaviorSubject<Joke[]>([]);

  public favourites$ = this._favourites$.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  public addFavourite(joke: Joke): void {
    joke.isFavourite = true;
    // new jokes are added to the top of the list:
    this._favourites$.next([joke, ...this._favourites$.value]);
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

  public toggleFavourite(joke: Joke): void {
    if (this.isFavourite(joke)) {
      this.removeFavourite(joke);
    } else {
      this.addFavourite(joke);
    }
  }

  private isFavourite(joke: Joke): boolean {
    return this._favourites$.value.includes(joke);
  }
}
