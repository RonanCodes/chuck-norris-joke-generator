import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { JokesComponent } from '../jokes/jokes.component';

import { MockComponent } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { JokeStoreService } from '../joke-store/joke-store.service';
import { RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const jokesStoreService = {
      ...jasmine.createSpyObj('JokeStoreService', ['toggleInterval']),
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
      ],
      providers: [
        {
          provide: JokeStoreService,
          useValue: jokesStoreService,
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
