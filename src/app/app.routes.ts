import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { JokesComponent } from './jokes/jokes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jokes', pathMatch: 'full' },
  { path: 'jokes', component: JokesComponent },
  { path: 'favourites', component: FavouritesComponent },
];
