import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokeListComponent } from '../../shared/feature/joke-list/joke-list.component';
import { FavouritesStoreService } from '../../shared/data/store/favourites-store/favourites-store.service';
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
