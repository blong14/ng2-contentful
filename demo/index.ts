import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, ComponentRef} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


const ENV_PROVIDERS: any[] = [];

// if ('production' === process.env.ENV) {
//   enableProdMode();
// } else {
//   ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
// }

import {appInjector} from './src/app-injector';
import {App} from './src/components/app.component';

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]).then((appRef: ComponentRef<any> ) => {
    appInjector(appRef.injector);
  })
    .catch(err => console.error(err));
});
