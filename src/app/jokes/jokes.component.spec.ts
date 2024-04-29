import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesComponent } from './jokes.component';
import { JokeStoreService } from '../joke-store/joke-store.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('JokesComponent', () => {
  let component: JokesComponent;
  let fixture: ComponentFixture<JokesComponent>;

  beforeEach(async () => {
    const jokesStoreService = jasmine.createSpyObj('JokeStoreService', [
      'getJokes',
    ]);
    jokesStoreService.getJokes.and.returnValue(
      of(['Chuck Norris can divide by zero.'])
    );

    await TestBed.configureTestingModule({
      imports: [JokesComponent, CommonModule],
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

  it('should render title', () => {
    const fixture = TestBed.createComponent(JokesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li')?.textContent).toContain(
      'Chuck Norris can divide by zero.'
    );
  });
});
