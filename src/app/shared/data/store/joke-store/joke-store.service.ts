import { Injectable } from '@angular/core';
import { ChuckNorrisJokeGeneratorService } from '../../rest/chuck-norris-joke-generator/chuck-norris-joke-generator.service';
import { BehaviorSubject, Observable, concat, tap } from 'rxjs';
import { Joke } from './joke-store.model';

@Injectable({
  providedIn: 'root',
})
export class JokeStoreService {
  private _jokes$ = new BehaviorSubject<Joke[]>([]);
  public jokes$ = this._jokes$.asObservable();

  constructor(
    private chuckNorrisJokeGeneratorService: ChuckNorrisJokeGeneratorService
  ) {}

  public initStore(): void {
    const jokeRequests: Observable<Joke>[] = Array(10).fill(
      this.chuckNorrisJokeGeneratorService.getJoke()
    );

    // Concat kicks off each request one after the other.
    // This must be done to ensure jokes are unique.
    concat(...jokeRequests).subscribe((joke) =>
      // Add the joke to the list of jokes:
      this._jokes$.next([...this._jokes$.value, joke])
    );
  }

  public triggerNewJoke(): void {
    this.chuckNorrisJokeGeneratorService
      .getJoke()
      .subscribe((joke) =>
        this._jokes$.next([joke, ...this._jokes$.value.splice(0, 9)])
      );
  }
}
