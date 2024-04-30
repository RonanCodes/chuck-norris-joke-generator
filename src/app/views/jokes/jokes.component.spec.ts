import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesComponent } from './jokes.component';
import { JokeStoreService } from '../../shared/data/store/joke-store/joke-store.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { JokeListComponent } from '../../shared/feature/joke-list/joke-list.component';
import { MockComponent } from 'ng-mocks';
import { Joke } from '../../shared/data/store/joke-store/joke-store.model';
import { By } from '@angular/platform-browser';

describe('JokesComponent', () => {
  let component: JokesComponent;
  let fixture: ComponentFixture<JokesComponent>;

  let jokes: Joke[];

  beforeEach(async () => {
    jokes = [{ value: 'Chuck Norris can divide by zero.', isFavourite: false }];

    const jokesStoreService = {
      ...jasmine.createSpyObj('JokeStoreService', ['']),
      jokes$: of(jokes),
    };

    await TestBed.configureTestingModule({
      imports: [JokesComponent, CommonModule, MockComponent(JokeListComponent)],
      providers: [
        {
          provide: JokeStoreService,
          useValue: jokesStoreService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('element: cnjg-joke-list [jokes]', () => {
    it('should be passed a list of jokes', () => {
      // Assert
      const JokeListComponentInstance = fixture.debugElement
        .query(By.directive(JokeListComponent))
        .injector.get(JokeListComponent);

      expect(JokeListComponentInstance.jokes).toBe(jokes);
    });
  });
});
