/// <reference path="app.d.ts" />

import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Component} from '@angular/core';
import {CredentialsComponent} from './credentials/credentials.component';
import {AssetsComponent} from './assets/assets.component';
import {EntriesComponent} from './entries/entries.component';
import {ContentTypesComponent} from './content-types/content-types.component';


@Component({
  selector: 'ng2-contentful-demo',
  directives: [...ROUTER_DIRECTIVES],
  styles: [<string>require('./app.scss')],
  template: `
    <header>
    <nav>
      <h1>NG2 Contentful demo</h1>
      <ul>
        <li>
          <a [routerLink]=" ['Credentials'] ">Contentful Credentials</a>
        </li>
        <li>
          <a [routerLink]=" ['ContentTypes'] ">Content types</a>
        </li>
        <li>
          <a [routerLink]=" ['Assets'] ">Assets</a>
        </li>
      </ul>
    </nav>
    </header>

    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/', component: CredentialsComponent, name: 'Credentials', useAsDefault: true},
  {path: '/assets', component: AssetsComponent, name: AssetsComponent.RoutingName},
  {path: '/entries/:contentType', component: EntriesComponent, name: EntriesComponent.RoutingName},
  {path: '/content-types', component: ContentTypesComponent, name: ContentTypesComponent.RoutingName},
  {path: '/**', redirectTo: ['Credentials']}
])
export class App {
}
