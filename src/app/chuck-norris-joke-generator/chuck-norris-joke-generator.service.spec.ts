import { TestBed } from '@angular/core/testing';

import { ChuckNorrisJokeGeneratorService } from './chuck-norris-joke-generator.service';

describe('ChuckNorrisJokeGeneratorService', () => {
  let service: ChuckNorrisJokeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckNorrisJokeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
