import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavouritesStoreService } from '../../data/store/favourites-store/favourites-store.service';
import { FavouriteIcon } from '../../model/material-icon.model';
import { Joke } from '../../data/store/joke-store/joke-store.model';

@Component({
  selector: 'cnjg-joke-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeListComponent {
  public favouriteIcon = FavouriteIcon;
  @Input() jokes: Joke[] = [];

  constructor(public favouritesStoreService: FavouritesStoreService) {}
}
