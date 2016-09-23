import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './src/components/app.component';
import { ContentTypesComponent } from './src/components/content-types/content-types.component';
import { AssetsComponent } from './src/components/assets/assets.component';
import { EntriesComponent } from './src/components/entries/entries.component';
import { ContentfulService } from '../src/services/contentful.service';
import { routing } from './router.config';

const ContentfulConfig = require('./contentful.cfg');

const ENV_PROVIDERS: any[] = [];

@NgModule({
  declarations: [
    AssetsComponent,
    ContentTypesComponent,
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
    {provide: 'ContentfulConfiguration', useValue: ContentfulConfig}
  ],
  bootstrap: [AppComponent]
})

export class DemoModule {
}

platformBrowserDynamic().bootstrapModule(DemoModule);
