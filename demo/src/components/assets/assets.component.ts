import {Component, OnInit} from '@angular/core';
import {ContentfulCommon, ContentfulAsset} from '../../../../src/ng-contentful-types';
import {ContentfulService} from '../../../../src/services/contentful.service';


@Component({
  template: `
    <h2>Assets</h2>
    <div class="error" *ngIf="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <li *ngFor="let asset of assets">
          <a href="{{ asset.fields.file.url }}">
            {{ asset.fields.title }}
          </a>
        </li>
      </ul>
    </div>
  `
})
export class AssetsComponent implements OnInit {
  static RoutingName = 'Assets';

  private assets: ContentfulCommon<ContentfulAsset>[];
  private error: string;
  private contentfulService: ContentfulService
  constructor(contentfulService: ContentfulService) {
    this.contentfulService = contentfulService;
  }

  ngOnInit(): any {
    this.contentfulService.create()
      .getAssets()
      .commit()
      .subscribe(
        response => {
          this.assets = <ContentfulCommon<ContentfulAsset>[]> response.json().items;
        },
        error => {
          this.error = JSON.stringify(error.json());
        }
      );
  }
}
