import {Component, OnInit} from '@angular/core';
import {CanActivate, RouteParams} from '@angular/router-deprecated';
import {CanSeeContentfulData} from '../app.tools';
import {ContentfulIterableResponse, ContentfulCommon} from '../../../../src/ng-contentful-types';
import {ContentfulService} from '../../../../src/services/contentful.service';

@Component({
  providers: [ContentfulService],
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
@CanActivate(CanSeeContentfulData)
export class EntriesComponent implements OnInit {
  static RoutingName = 'Entries';

  private entries: ContentfulCommon<any>[];

  constructor(private _contentfulService: ContentfulService,
              private _routeParams: RouteParams) {
  }

  ngOnInit(): any {
    let contentType = this._routeParams.get('contentType');
    this._contentfulService
      .create()
      .getEntriesByType(contentType)
      .commit()
      .subscribe(
        response => {
          this.entries = (<ContentfulIterableResponse<ContentfulCommon<any>>> response.json()).items;
          console.log(this.entries);
        }
      );
  }
}
