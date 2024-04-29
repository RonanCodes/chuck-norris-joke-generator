import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cnjg-favourites',
  standalone: true,
  imports: [],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent {}
