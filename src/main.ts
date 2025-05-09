import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)

  // eslint-disable-next-line unicorn/prefer-top-level-await, unicorn/catch-error-name, unicorn/prevent-abbreviations
  .catch((err) => console.error(err));
