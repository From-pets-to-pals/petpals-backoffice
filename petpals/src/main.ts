import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appWindow } from '@tauri-apps/api/window'
// @ts-ignore

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
