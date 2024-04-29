import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokeListComponent } from '../joke-list/joke-list.component';
import { FavouritesStoreService } from '../favourites-store/favourites-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cnjg-favourites',
  standalone: true,
  imports: [CommonModule, JokeListComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent {
  constructor(public favouritesStoreService: FavouritesStoreService) {}
}
