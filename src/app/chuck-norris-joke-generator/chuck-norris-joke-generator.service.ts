import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChuckNorrisJoke } from './chuck-norris-joke-generator.model';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { chuckNorrisApi } from './chuck-norris-joke-generator.constant';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisJokeGeneratorService {
  constructor(private httpClient: HttpClient) {}

  public getJoke(): Observable<string> {
    return this.httpClient.get<ChuckNorrisJoke>(chuckNorrisApi).pipe(
      tap((joke) => console.log(joke)),
      map((joke) => joke.value)
    );
  }
}
