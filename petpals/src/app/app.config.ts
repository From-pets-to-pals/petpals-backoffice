import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {StoreModule} from "@ngrx/store";
import {provideAnimations} from "@angular/platform-browser/animations";

// @ts-ignore
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations(), provideAnimationsAsync(),importProvidersFrom(StoreModule.forRoot({}))]
}
