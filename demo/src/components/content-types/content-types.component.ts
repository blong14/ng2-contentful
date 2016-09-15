import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import {
  ContentfulIterableResponse,
  ContentfulCommon,
  ContentfulContentType
} from '../../../../src/ng-contentful-types';
import { ContentfulService } from '../../../../src/services/contentful.service';
import { Response } from '@angular/http';

@Component({
  template: `
    <h2>Content types</h2>
    <div class="error" *ngIf="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <li *ngFor="let contentType of contentTypes">
          <a [routerLink]="['/entries', contentType.sys.id ]">
            {{ contentType.name }}
          </a>
        </li>
      </ul>
    </div>
  `
})
export class ContentTypesComponent implements OnInit {
  // noinspection JSMismatchedCollectionQueryUpdate
  private contentTypes: ContentfulCommon<ContentfulContentType>[];
  private error: string;
  private contentfulService: ContentfulService;

  public constructor(contentfulService: ContentfulService) {
    this.contentfulService = contentfulService;
  }

  public ngOnInit(): void {
    this.contentfulService
      .create()
      .getContentTypes()
      .commit()
      .subscribe(
        (response: Response) => {
          this.contentTypes = (response.json() as ContentfulIterableResponse<ContentfulCommon<ContentfulContentType>>).items;
        },
        (error: Response) => {
          this.error = JSON.stringify(error.json());
        }
      );
  }
}
