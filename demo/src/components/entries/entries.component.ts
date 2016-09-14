import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ContentfulIterableResponse, ContentfulCommon } from '../../../../src/ng-contentful-types';
import { ContentfulService } from '../../../../src/services/contentful.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <h2>Entries</h2>
    <div class="error" *ngIf="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <li *ngFor="let entry of entries">
           {{ entry.fields.title }}
        </li>
      </ul>
    </div>
  `
})
export class EntriesComponent implements OnInit {

  private entries: ContentfulCommon<any>[];

  private router: Router;
  private contentfulService: ContentfulService;

  public constructor(router: Router, contentfulService: ContentfulService) {
    this.router = router;
    this.contentfulService = contentfulService;
  }

  public ngOnInit(): any {
    const contentType = this.router.url.split('/').pop();
    this.contentfulService
      .create()
      .getEntriesByType(contentType)
      .commit()
      .subscribe(
        (response: Response) => {
          this.entries = (response.json() as ContentfulIterableResponse<ContentfulCommon<any>>).items;
          console.log(this.entries);
        }
      );
  }
}
