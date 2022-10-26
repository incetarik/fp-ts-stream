import { Eq } from 'fp-ts/lib/Eq'
import { Magma } from 'fp-ts/lib/Magma'

import { AsyncStream } from '../uri'
import { difference } from '../utils/difference'

/**
 * Derives {@link Magma} for {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {Magma<AsyncStream<A>>} A magma instance of async stream of type `A`.
 * 
 * @__PURE__
 */
export function getDifferenceMagma<A>(E: Eq<A>): Magma<AsyncStream<A>> {
  const differenceE = difference(E)
  return {
    concat(first, second) {
      return differenceE(second, first)
    },
  }
}
