import { guard as zeroGuard, Zero1 } from 'fp-ts/lib/Zero'

import { Pointed } from './pointed'
import { Stream, URI } from './uri'

/**
 * Returns an empty {@link Stream} of type `A`.
 *
 * @export
 * @template A The value type.
 * @return {Stream<A>} A {@link Stream} instance that will yield no values.
 * 
 * @category model
 */
export function zero<A>(): Stream<A> {
  return function* _zero() {}
}

/**
 * An empty {@link Stream} instance.
 */
export const empty = zero<never>()

/**
 * The `Zero` category instance for {@link Stream}.
 * 
 * @category model
 */
export const Zero: Zero1<URI> = {
  URI,
  zero,
}

/**
 * @category do notation
 */
export const guard = zeroGuard(Zero, Pointed)
