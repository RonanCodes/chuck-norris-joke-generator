import { TestBed } from '@angular/core/testing';

import { JokeStoreService } from './joke-store.service';
import { ChuckNorrisJokeGeneratorService } from '../chuck-norris-joke-generator/chuck-norris-joke-generator.service';

describe('JokeStoreService', () => {
  let service: JokeStoreService;

  beforeEach(() => {
    const chuckNorrisJokeGeneratorService = jasmine.createSpyObj(
      'ChuckNorrisJokeGeneratorService',
      ['getJoke']
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ChuckNorrisJokeGeneratorService,
          useValue: chuckNorrisJokeGeneratorService,
        },
      ],
    });
    service = TestBed.inject(JokeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
