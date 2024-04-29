import { Injectable } from '@angular/core';
import { ChuckNorrisJokeGeneratorService } from '../chuck-norris-joke-generator/chuck-norris-joke-generator.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokeStoreService {
  constructor(
    private chuckNorrisJokeGeneratorService: ChuckNorrisJokeGeneratorService
  ) {}

  /**
   * @returns a list of 10 jokes
   */
  public getJokes(): Observable<string[]> {
    // TODO: Look into a more efficient way to do 10 concurrent requests (showing them as they return in the view):
    return forkJoin(
      Array(10).fill(this.chuckNorrisJokeGeneratorService.getJoke())
    );
  }
}
