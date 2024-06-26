import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokesComponent } from '../jokes/jokes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JokeStoreService } from '../../shared/data/store/joke-store/joke-store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { concat, delay, of, switchMap } from 'rxjs';
import { IntervalRunningStoreService } from '../../shared/data/store/interval-running-store/interval-running-store.service';
import { HourGlass } from '../../shared/model/material-icon.model';

@Component({
  selector: 'cnjg-home',
  standalone: true,
  imports: [
    JokesComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('spinAnimation', [
      state(
        'spin',
        style({
          transform: 'rotate(360deg)',
        }),
      ),
      state(
        'stop',
        style({
          transform: 'rotate(0)',
        }),
      ),
      transition('spin <=> stop', [animate('0.5s')]),
    ]),
  ],
})
export class HomeComponent {
  public hourGlass = HourGlass;

  constructor(
    public jokeStoreService: JokeStoreService,
    public intervalRunningStoreService: IntervalRunningStoreService,
  ) {}

  /**
   * Triggers the spin animation every time there is a new joke.
   */
  public isSpin$ = this.jokeStoreService.jokes$.pipe(
    switchMap(() => concat(of('spin'), of('stop').pipe(delay(500)))),
  );
}
