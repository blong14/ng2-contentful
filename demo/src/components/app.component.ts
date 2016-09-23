import { Component } from '@angular/core';
import { ContentfulService } from '../../../index';

@Component({
  selector: 'ng2-contentful-demo',
  styles: [require('./app.component.css') as string],
  template: `
    <header>
    <nav>
      <h1>NG2 Contentful demo</h1>
      <ul>
        <li>
          <a [routerLink]=" [''] ">Assets</a>
        </li>
        <li>
          <a [routerLink]=" ['/content-types'] ">Content types</a>
        </li>
      </ul>
    </nav>
    </header>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  public contentfulService: ContentfulService;

  constructor(contentfulService: ContentfulService) {
    this.contentfulService = contentfulService;
  }
}
