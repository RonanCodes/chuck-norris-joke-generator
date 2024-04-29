import { TestBed } from '@angular/core/testing';

import { ChuckNorrisJokeGeneratorService } from './chuck-norris-joke-generator.service';
import { provideHttpClient } from '@angular/common/http';

describe('ChuckNorrisJokeGeneratorService', () => {
  let service: ChuckNorrisJokeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ChuckNorrisJokeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
