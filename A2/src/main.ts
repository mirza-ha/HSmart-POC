import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

import {KeycloakService} from './app/keycloak.service';



if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic().bootstrapModule(AppModule);


KeycloakService.init()
.then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
})
.catch((reason: any) => { 
  window.location.reload();
  //alert(reason);
});
