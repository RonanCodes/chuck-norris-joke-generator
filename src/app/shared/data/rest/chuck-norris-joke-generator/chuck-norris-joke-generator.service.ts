import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChuckNorrisJoke } from './chuck-norris-joke-generator.model';
import { Observable, map } from 'rxjs';
import { chuckNorrisApi } from './chuck-norris-joke-generator.constant';
import { Joke } from '../../store/joke-store/joke-store.model';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisJokeGeneratorService {
  constructor(private httpClient: HttpClient) {}

  public getJoke(): Observable<Joke> {
    return this.httpClient
      .get<ChuckNorrisJoke>(chuckNorrisApi)
      .pipe(map((joke) => ({ value: joke.value, isFavourite: false })));
  }
}
