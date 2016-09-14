import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTypesComponent } from '../content-types/content-types.component';
import { IContentfulConfig, Ng2ContentfulConfig } from '../../../../src/ng2-contentful-config';

@Component({
  styles: [<string> require('./credentials.scss')],
  template: `
    <h2>Credentials</h2>
    <div class="form">
      <div class="field">
        <label for="space">Space ID</label>
        <input type="text"
               name="space"
               [(ngModel)]="model.space"/>
      </div>

      <div class="field">
        <label for="accessToken">Access Token</label>
        <input type="text"
               name="accessToken"
               [(ngModel)]="model.accessToken"/>
      </div>
      
      <div class="field">
        <label for="host">Host (optional)</label>
        <input type="text"
               name="host"
               [(ngModel)]="model.host"/>
      </div>
      <button (click)="saveConfig()">
        Save
      </button>
    </div>
  `
})
export class CredentialsComponent implements OnInit {
  static RoutingName = 'Credentials';
  private model: IContentfulConfig = {
    space: '', accessToken: ''
  };
  private router: Router;

  public constructor(router: Router) {
    this.router = router;

  }

  public ngOnInit(): any {
    if (Ng2ContentfulConfig.isConfigured) {
      this.model = Ng2ContentfulConfig.config;
    }
  }

  public saveConfig() {
    if (!this.model || (!this.model.space.length || !this.model.accessToken.length)) {
      console.warn('credentials empty !');
      return;
    }

    Ng2ContentfulConfig.config = {
      space: this.model.space,
      accessToken: this.model.accessToken,
      host: this.model.host
    };
    this.router.navigate(['/content-types']);
  }
}
