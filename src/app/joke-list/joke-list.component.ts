import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavouritesStoreService } from '../favourites-store/favourites-store.service';
import { Joke } from '../chuck-norris-joke-generator/chuck-norris-joke-generator.model';

@Component({
  selector: 'cnjg-joke-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeListComponent {
  @Input() jokes: Joke[] = [];

  constructor(public favouritesStoreService: FavouritesStoreService) {}
}
