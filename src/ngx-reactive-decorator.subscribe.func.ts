
import { ObservablesInterface } from './ngx-reactive-decorator.interface';
import { subscribeOnInit } from './subscribe-on-init.func';
import { unsubscribeOnDestroy } from './unsubscribe-on-destroy.func';

/**
 * @export
 * @template T
 * @param {ObservablesInterface} observables
 * @returns {Function}
 */
export function Subscribe<T>(observables: ObservablesInterface): Function {
  return function (target: any) {
    subscribeOnInit<T>(target, observables);
    unsubscribeOnDestroy(target, observables);
  }
};
