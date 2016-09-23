import { Component, OnInit } from '@angular/core';
import { ContentfulService, ContentfulCommon } from '../../../../index';
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
    if (this.contentfulService.isServiceConfigured()) {
      const contentType = this.router.url.split('/').pop();

      this.contentfulService
        .create()
        .getEntriesByType(contentType)
        .commit()
        .subscribe((value)=> {
          this.entries = value.items;
        });
    } else {
      this.router.navigateByUrl('');
    }
  }
}
