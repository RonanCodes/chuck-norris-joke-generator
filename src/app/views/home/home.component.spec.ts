import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { JokesComponent } from '../jokes/jokes.component';

import { MockComponent } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { JokeStoreService } from '../../shared/data/store/joke-store/joke-store.service';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IntervalRunningStoreService } from '../../shared/data/store/interval-running-store/interval-running-store.service';
import { HourGlass } from '../../shared/model/material-icon.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let isNewJokeIntervalRunning$: Subject<boolean>;

  let jokesStoreService: jasmine.SpyObj<JokeStoreService>;
  let intervalRunningStoreService: jasmine.SpyObj<IntervalRunningStoreService>;

  beforeEach(async () => {
    isNewJokeIntervalRunning$ = new BehaviorSubject<boolean>(false);

    jokesStoreService = {
      ...jasmine.createSpyObj('JokeStoreService', ['']),
      jokes$: of([]),
    };

    intervalRunningStoreService = {
      ...jasmine.createSpyObj('IntervalRunningStoreService', [
        'toggleInterval',
      ]),
      isNewJokeIntervalRunning$,
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

  describe('toggleInterval', () => {
    it('should call #intervalRunningStoreService.toggleInterval()', () => {
      (
        fixture.debugElement.nativeElement.querySelector(
          '#toggle-interval-button',
        ) as HTMLButtonElement
      ).dispatchEvent(new Event('click'));

      expect(intervalRunningStoreService.toggleInterval).toHaveBeenCalled();
    });
  });

  describe('#isNewJokeIntervalRunning$', () => {
    [
      { isNewJokeIntervalRunning: true, expectedIcon: HourGlass.Full },
      { isNewJokeIntervalRunning: false, expectedIcon: HourGlass.Empty },
    ].forEach((testCase) => {
      it(`should display ${testCase.expectedIcon} when #isNewJokeIntervalRunning$ emits ${testCase.isNewJokeIntervalRunning} `, () => {
        // Act
        isNewJokeIntervalRunning$.next(testCase.isNewJokeIntervalRunning);
        fixture.detectChanges();

        // Assert
        const hourGlassIcon = fixture.debugElement.nativeElement.querySelector(
          '#toggle-interval-button mat-icon',
        ).textContent;

        expect(hourGlassIcon).toContain(testCase.expectedIcon);
      });
    });
  });
});
