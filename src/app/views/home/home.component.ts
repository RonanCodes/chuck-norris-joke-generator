import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokesComponent } from '../jokes/jokes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JokeStoreService } from '../../shared/data/store/joke-store/joke-store.service';
import { HourGlass } from '../../shared/data/rest/chuck-norris-joke-generator/chuck-norris-joke-generator.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
})
export class HomeComponent {
  public hourGlass = HourGlass;
  constructor(public jokeStoreService: JokeStoreService) {}
}
