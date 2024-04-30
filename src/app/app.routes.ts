import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FavouritesComponent } from './views/favourites/favourites.component';
import { JokesComponent } from './views/jokes/jokes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jokes', pathMatch: 'full' },
  { path: 'jokes', component: JokesComponent },
  { path: 'favourites', component: FavouritesComponent },
];
