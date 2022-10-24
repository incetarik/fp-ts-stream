import { Extend1 } from 'fp-ts/lib/Extend'
import { pipe } from 'fp-ts/lib/function'

import { Functor, mapWithIndex } from './functor'
import { AsyncStream, URI } from './uri'
import { dropLeft } from './utils/drop-left'

/**
 * Given an iterating function that takes an {@link AsyncStream} as input,
 * `extend` returns an {@link AsyncStream} containing the results of the
 * iterating function applied to the whole input {@link AsyncStream}, then to
 * the input {@link AsyncStream} without the first element, then to the
 * input {@link AsyncStream} without the first two elements, etc.
 *
 * @export
 * @template A The input value type.
 * @template B The output value.
 * @param {(ma: AsyncStream<A>) => B} f The mapping function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream of type `A` and returns another async stream of type `B`.
 * 
 * @__PURE__
 */
export function extend<A, B>(f: (fa: AsyncStream<A>) => B) {
  /**
   * Takes an input {@link AsyncStream} to map with the previously given
   * function and returns another {@link AsyncStream} of results.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _extend(fa: AsyncStream<A>): AsyncStream<B> {
    return pipe(
      fa,
      mapWithIndex((i, _) => f(pipe(fa, dropLeft(i))))
    )
  }
}

/**
 * The `Extend` category instance for {@link AsyncStream}.
 */
export const Extend: Extend1<URI> = {
  URI,
  map: Functor.map,
  extend(wa, f) { return extend(f)(wa) },
}
