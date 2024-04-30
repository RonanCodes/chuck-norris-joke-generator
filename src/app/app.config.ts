import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { JokeStoreService } from './shared/data/store/joke-store/joke-store.service';
import { FavouritesStoreService } from './shared/data/store/favourites-store/favourites-store.service';
import { IntervalRunningStoreService } from './shared/data/store/interval-running-store/interval-running-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (
        jokeStoreService: JokeStoreService,
        favouritesStoreService: FavouritesStoreService,
        intervalRunningStoreService: IntervalRunningStoreService
      ) => {
        jokeStoreService.initStore();
        favouritesStoreService.initStore();
        intervalRunningStoreService.initStore();
      },
      deps: [
        JokeStoreService,
        FavouritesStoreService,
        IntervalRunningStoreService,
      ],
    },
  ],
};
