import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { destinosReducer } from './store/destinos.reducer';
import { APP_CONFIG, APP_CONFIG_VALUE } from './tokens/app.tokens';
import { AuthService, BaseAuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ destinos: destinosReducer }),
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: BaseAuthService, useClass: AuthService },
    { provide: AuthService, useExisting: BaseAuthService }
  ]
};
