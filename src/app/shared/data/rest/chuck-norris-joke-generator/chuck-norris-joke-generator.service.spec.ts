import { TestBed } from '@angular/core/testing';

import { ChuckNorrisJokeGeneratorService } from './chuck-norris-joke-generator.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ChuckNorrisJoke } from './chuck-norris-joke-generator.model';

describe('ChuckNorrisJokeGeneratorService', () => {
  let service: ChuckNorrisJokeGeneratorService;

  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(
      of({ value: 'God prays to Chuck Norris' } as ChuckNorrisJoke),
    );

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    });
    service = TestBed.inject(ChuckNorrisJokeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getJoke()', () => {
    it('should return an Observable<Joke>', (done) => {
      // Act
      service.getJoke().subscribe((joke) => {
        // Assert
        expect(joke.value).toBe('God prays to Chuck Norris');
        expect(joke.isFavourite).toBeFalse();
        done();
      });
    });
  });
});
