import { Router, CanActivate } from '@angular/router';
import { Ng2ContentfulConfig } from '../../../src/ng2-contentful-config';
import { Injectable } from '@angular/core';
/**
 * Not the best place for that
 */

@Injectable()
export class CanSeeContentfulData implements CanActivate {
  private router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  public canActivate(): boolean {
    if (!Ng2ContentfulConfig.isConfigured) {
      this.router.navigate(['/content-types']);

      return false;
    }

    return true;
  }

}
