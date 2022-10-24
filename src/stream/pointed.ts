import { Pointed1 } from 'fp-ts/lib/Pointed'

import { Stream, URI } from './uri'

/**
 * Returns a {@link Stream} of type `A` streaming the given element.
 *
 * @export
 * @template A The value type.
 * @param {A} a The value.
 * @return {Stream<A>} A {@link Stream} instance of type `A`.
 * 
 * @category model
 * @__PURE__
 */
export function of<A>(a: A): Stream<A> {
  return function* _of() { yield a }
}

/**
 * The `Pointed` category instance for {@link Stream}.
 * 
 * @category model
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of,
}
