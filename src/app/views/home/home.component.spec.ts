import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { JokesComponent } from '../jokes/jokes.component';

import { MockComponent } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { JokeStoreService } from '../../shared/data/store/joke-store/joke-store.service';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IntervalRunningStoreService } from '../../shared/data/store/interval-running-store/interval-running-store.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const jokesStoreService = {
      ...jasmine.createSpyObj('JokeStoreService', ['']),
      jokes$: of([]),
    };

    const intervalRunningStoreService = {
      ...jasmine.createSpyObj('IntervalRunningStoreService', [
        'toggleInterval',
      ]),
      isNewJokeIntervalRunning$: of(true),
    };

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        MockComponent(JokesComponent),
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        CommonModule,
        RouterModule.forRoot([]),
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: JokeStoreService,
          useValue: jokesStoreService,
        },
        {
          provide: IntervalRunningStoreService,
          useValue: intervalRunningStoreService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
