import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';
import { Ng2ContentfulConfig } from '../../../src/ng2-contentful-config';
import { Injectable } from '@angular/core';
/**
 * Not the best place for that
 */

@Injectable()
export class CanSeeContentfulData implements CanActivate {
  public constructor(private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!Ng2ContentfulConfig.isConfigured) {
      this.router.navigate([CredentialsComponent.RoutingName]);
      return false;
    }
    return true;
  }

}
