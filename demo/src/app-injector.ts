/**
 * Created by dydo on 12/02/16.
 */

import {Injector} from '@angular/core';

let appInjectorRef: Injector;
export const appInjector = (injector?: Injector):Injector => {
  if (injector) {
    appInjectorRef = injector;
  }
  return appInjectorRef;
};
