import { Extend1 } from 'fp-ts/lib/Extend'
import { pipe } from 'fp-ts/lib/function'

import { Functor, mapWithIndex } from './functor'
import { Stream, URI } from './uri'
import { dropLeft } from './utils/drop-left'

/**
 * Given an iterating function that takes a {@link Stream} as input, `extend`
 * returns a {@link Stream} containing the results of the iterating function
 * applied to the whole input {@link Stream}, then to the input {@link Stream}
 * without the first element, then to the input {@link Stream} without the first
 * two elements, etc.
 *
 * @export
 * @template A The input value type.
 * @template B The output value.
 * @param {(ma: Stream<A>) => B} f The mapping function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream of
 * type `A` and returns another stream of type `B`.
 * 
 * @__PURE__
 */
export function extend<A, B>(f: (fa: Stream<A>) => B) {
  /**
   * Takes an input {@link Stream} to map with the previously given function
   * and returns another {@link Stream} of results.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _extend(fa: Stream<A>): Stream<B> {
    return pipe(
      fa,
      mapWithIndex((i, _) => f(pipe(fa, dropLeft(i))))
    )
  }
}

/**
 * The `Extend` category instance for {@link Stream}.
 */
export const Extend: Extend1<URI> = {
  URI,
  map: Functor.map,
  extend(wa, f) { return extend(f)(wa) },
}
