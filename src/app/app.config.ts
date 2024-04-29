import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { JokeStoreService } from './joke-store/joke-store.service';
import { FavouritesStoreService } from './favourites-store/favourites-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (
        jokeStoreService: JokeStoreService,
        favouritesStoreService: FavouritesStoreService
      ) => {
        jokeStoreService.initStore();
        favouritesStoreService.initStore();
      },
      deps: [JokeStoreService, FavouritesStoreService],
    },
  ],
};
