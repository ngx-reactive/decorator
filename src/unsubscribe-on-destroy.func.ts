import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash-es';

import { ObservablesInterface } from './ngx-reactive-decorator.interface';

export const unsubscribeOnDestroy = function (target: any, observables?: ObservablesInterface): void {
  // Original ngOnDestroy
  const ngOnDestroy = target.prototype.ngOnDestroy;
  // Add unsubscribe.
  target.prototype.ngOnDestroy = function () {
    if (observables === undefined) {
      _.each(this, (subscription: Subscription) => {
        // Find properties in component and search for subscription instance.
        if (subscription instanceof Subscription) {
          subscription.unsubscribe();
        }
      });
    } else {
      /*
      _.each(observables, (observer: string) => {
        // Find properties in component and search for subscription instance.
        if (this.subscription[observer] instanceof Subscription) {
          this.subscription[observer].unsubscribe();
        }
      });
      */
    }
    if (ngOnDestroy !== undefined) {
      ngOnDestroy.apply(this, arguments);
    }
  };
}
