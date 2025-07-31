import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { UiFacade } from './core/ui/facades/ui.facade';
import { InMemoryUiFacade } from './core/ui/facades/in-memory.ui.facade';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: UiFacade,
      useClass: InMemoryUiFacade,
    },
    provideStore(),
    provideStoreDevtools({
      maxAge: 25
    })
  ],
};
