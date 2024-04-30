import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../util/local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { JokeStoreService } from '../joke-store/joke-store.service';

// TODO: This will encapsulate the interval logic that is currently inside the joke store service.
@Injectable({
  providedIn: 'root',
})
export class IntervalRunningStoreService {
  private intervalMs = 5000;

  private newJokeIntervalId: number | undefined;

  private _isNewJokeIntervalRunning$ = new BehaviorSubject<boolean>(true);

  public isNewJokeIntervalRunning$ =
    this._isNewJokeIntervalRunning$.asObservable();

  constructor(
    private jokeStoreService: JokeStoreService,
    private localStorageService: LocalStorageService
  ) {}

  public initStore(): void {
    this.loadIntervalStateFromLocalStorage();
  }

  public toggleInterval(): void {
    if (this._isNewJokeIntervalRunning$.value) {
      this.cancelNewJokeTimer();
      this._isNewJokeIntervalRunning$.next(false);
    } else {
      this.newJokeIntervalId = this.startNewJokeTimer();
      this._isNewJokeIntervalRunning$.next(true);
    }

    this.persistIntervalStateToLocalStorage();
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
      this.jokeStoreService.triggerNewJoke();
    }, this.intervalMs);
  }

  private persistIntervalStateToLocalStorage(): void {
    this.localStorageService.saveToLocalStorage(
      'intervalState',
      JSON.stringify(this._isNewJokeIntervalRunning$.value)
    );
  }

  private loadIntervalStateFromLocalStorage(): void {
    const intervalState =
      this.localStorageService.getFromLocalStorage('intervalState');

    if (intervalState) {
      this._isNewJokeIntervalRunning$.next(JSON.parse(intervalState));
    }

    if (this._isNewJokeIntervalRunning$.value) {
      this.newJokeIntervalId = this.startNewJokeTimer();
    }
  }
}
