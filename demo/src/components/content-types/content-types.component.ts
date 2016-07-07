import 'rxjs/add/operator/map';
import {Component, OnInit} from '@angular/core';
import {CanActivate, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CanSeeContentfulData} from '../app.tools';
import {ContentfulIterableResponse, ContentfulCommon, ContentfulContentType} from '../../../../src/ng-contentful-types';
import {ContentfulService} from '../../../../src/services/contentful.service';


@Component({
  providers: [ContentfulService],
  directives: [...ROUTER_DIRECTIVES],
  template: `
    <h2>Content types</h2>
    <div class="error" *ngIf="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <li *ngFor="let contentType of contentTypes">
          <a [routerLink]="['Entries', {contentType: contentType.sys.id }]">
            {{ contentType.name }}
          </a>
        </li>
      </ul>
    </div>
  `
})
@CanActivate(CanSeeContentfulData)
export class ContentTypesComponent implements OnInit {
  static RoutingName = 'ContentTypes';

  //noinspection JSMismatchedCollectionQueryUpdate
  private contentTypes: ContentfulCommon<ContentfulContentType>[];
  private error: string;

  constructor(private _contentfulService: ContentfulService) {
  }

  ngOnInit(): any {
    this._contentfulService
      .create()
      .getContentTypes()
      .commit()
      .subscribe(
        response => {
          this.contentTypes = (<ContentfulIterableResponse<ContentfulCommon<ContentfulContentType>>> response.json()).items;
        },
        error => {
          this.error = JSON.stringify(error.json());
        }
      );
  }
}
