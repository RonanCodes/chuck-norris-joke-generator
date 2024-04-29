import { Injectable } from '@angular/core';
import { ChuckNorrisJokeGeneratorService } from '../chuck-norris-joke-generator/chuck-norris-joke-generator.service';
import { BehaviorSubject, Observable, concat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokeStoreService {
  private _jokes$ = new BehaviorSubject<string[]>([]);
  public jokes$ = this._jokes$.asObservable();

  private newJokeIntervalId: number | undefined;

  private _isNewJokeIntervalRunning$ = new BehaviorSubject<boolean>(false);

  public isNewJokeIntervalRunning$ =
    this._isNewJokeIntervalRunning$.asObservable();

  constructor(
    private chuckNorrisJokeGeneratorService: ChuckNorrisJokeGeneratorService
  ) {
    this.newJokeIntervalId = this.startNewJokeTimer();
  }

  public toggleInterval(): void {
    if (this.newJokeIntervalId) {
      this.cancelNewJokeTimer();
      this._isNewJokeIntervalRunning$.next(false);
    } else {
      this.newJokeIntervalId = this.startNewJokeTimer();
      this._isNewJokeIntervalRunning$.next(true);
    }
  }

  public initStore(): void {
    const jokeRequests: Observable<string>[] = Array(10).fill(
      this.chuckNorrisJokeGeneratorService.getJoke()
    );

    // Concat kicks off each request one after the other.
    // This must be done to ensure jokes are unique.
    concat(...jokeRequests).subscribe((joke) =>
      // Add the joke to the list of jokes:
      this._jokes$.next([...this._jokes$.value, joke])
    );
  }

  public cancelNewJokeTimer(): void {
    window.clearInterval(this.newJokeIntervalId);
    this.newJokeIntervalId = undefined;
    this._isNewJokeIntervalRunning$.next(false);
  }

  // TODO: Move this to interval-running-store:
  public startNewJokeTimer(): number {
    this._isNewJokeIntervalRunning$.next(true);

    // Every 5 seconds, add a new joke to the list of jokes:
    return window.setInterval(() => {
      this.chuckNorrisJokeGeneratorService.getJoke().subscribe((joke) => {
        console.log({ joke });
        this._jokes$.next([joke, ...this._jokes$.value.splice(0, 9)]);
      });
    }, 5000);
  }
}
