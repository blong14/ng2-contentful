import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const ENV_PROVIDERS: any[] = [];

// if ('production' === process.env.ENV) {
//   enableProdMode();
// } else {
//   ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
// }

import { AppComponent } from './src/components/app.component';
import { ContentTypesComponent } from './src/components/content-types/content-types.component';
import { AssetsComponent } from './src/components/assets/assets.component';
import { CredentialsComponent } from './src/components/credentials/credentials.component';
import { EntriesComponent } from './src/components/entries/entries.component';
import { ContentfulService } from '../src/services/contentful.service';
import { routing } from './router.config';
import { CanSeeContentfulData } from './src/components/app.tools';

@NgModule({
  declarations: [
    AssetsComponent,
    ContentTypesComponent,
    CredentialsComponent,
    EntriesComponent,
    AppComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ENV_PROVIDERS,
    ContentfulService,
    CanSeeContentfulData
  ],
  bootstrap: [AppComponent]
})

export class DemoModule {
}

platformBrowserDynamic().bootstrapModule(DemoModule);
