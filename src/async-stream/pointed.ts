import { Pointed1 } from 'fp-ts/lib/Pointed'

import { AsyncStream, URI } from './uri'

/**
 * Returns a {@link AsyncStream} of type `A` streaming the given element.
 *
 * @export
 * @template A The value type.
 * @param {A} a The value.
 * @return {AsyncStream<A>} A {@link AsyncStream} instance of type `A`.
 * 
 * @category model
 */
export function of<A>(a: A): AsyncStream<A> {
  return async function* _of() { yield a }
}

/**
 * The `Pointed` category instance for {@link AsyncStream}.
 * 
 * @category model
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of,
}
