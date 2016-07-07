import {Component, OnInit} from '@angular/core';
import {CanSeeContentfulData} from '../app.tools';
import {CanActivate} from '@angular/router-deprecated';
import {ContentfulCommon, ContentfulAsset} from '../../../../src/ng-contentful-types';
import {ContentfulService} from '../../../../src/services/contentful.service';


@Component({
  providers: [ContentfulService],
  template: `
    <h2>Assets</h2>
    <div class="error" *ngIf="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <li *ngFor="#asset of assets">
          <a href="{{ asset.fields.file.url }}">
            {{ asset.fields.title }}
          </a>
        </li>
      </ul>
    </div>
  `
})
@CanActivate(CanSeeContentfulData)
export class AssetsComponent implements OnInit {
  static RoutingName = 'Assets';

  private assets: ContentfulCommon<ContentfulAsset>[];
  private error: string;

  constructor(private _contentfulService: ContentfulService) {
  }

  ngOnInit(): any {
    this._contentfulService.create()
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
