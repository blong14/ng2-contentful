import { Component } from '@angular/core';

@Component({
  selector: 'ng2-contentful-demo',
  styles: [require('./app.component.css') as string],
  template: `
    <header>
    <nav>
      <h1>NG2 Contentful demo</h1>
      <ul>
        <li>
          <a [routerLink]=" [''] ">Contentful Credentials</a>
        </li>
        <li>
          <a [routerLink]=" ['/content-types'] ">Content types</a>
        </li>
        <li>
          <a [routerLink]=" ['/assets'] ">Assets</a>
        </li>
      </ul>
    </nav>
    </header>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
