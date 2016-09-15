import { Component, OnInit } from '@angular/core';
import { ContentfulCommon, ContentfulAsset } from '../../../../src/ng-contentful-types';
import { ContentfulService } from '../../../../src/services/contentful.service';
import { Response } from '@angular/http';

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
  public static RoutingName: string = 'Assets';

  private assets: ContentfulCommon<ContentfulAsset>[];
  private error: string;
  private contentfulService: ContentfulService;

  public constructor(contentfulService: ContentfulService) {
    this.contentfulService = contentfulService;
  }

  public ngOnInit(): void {
    this.contentfulService.create()
      .getAssets()
      .commit()
      .subscribe(
        (response: Response) => {
          this.assets = response.json().items as ContentfulCommon<ContentfulAsset>[];
        },
        (error: Response) => {
          this.error = JSON.stringify(error.json());
        }
      );
  }
}
