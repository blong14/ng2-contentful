
import {appInjector} from '../app-injector';
import {Router} from '@angular/router-deprecated';
import {CredentialsComponent} from './credentials/credentials.component';
import {Ng2ContentfulConfig} from '../../../src/ng2-contentful-config';
/**
 * Not the best place for that
 */

export let CanSeeContentfulData = () => {
  var injector = appInjector();
  let router = injector.get(Router);
  if (!Ng2ContentfulConfig.isConfigured) {
    router.navigate([CredentialsComponent.RoutingName]);
    return false;
  }
  return true;
};
