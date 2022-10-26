import { Eq } from 'fp-ts/lib/Eq'

import { toArray } from '../conversions'
import { AsyncStream } from '../uri'

/**
 * Creates an {@link AsyncStream} of {@link AsyncStream} values not included in
 * the other given {@link AsyncStream} using a {@link Eq} for equality
 * comparisons.
 * 
 * The order and references of result values are determined by the first
 * {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(xs: AsyncStream<A>) => (ys: AsyncStream<A>) => AsyncStream<A>} A
 * function that takes an async stream to provide the differences.
 * 
 * @__PURE__
 */
export function difference<A>(E: Eq<A>) {
  /**
   * Takes an {@link AsyncStream} and returns another {@link AsyncStream}
   * instance to create an {@link AsyncStream} of differences.
   *
   * @param {AsyncStream<A>} xs The asyc stream of values.
   * @return {(ys: AsyncStream<A>) => AsyncStream<A>} A function that takes an
   * async stream to exclude the items of it from the given stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _difference(xs: AsyncStream<A>): (ys: AsyncStream<A>) => AsyncStream<A>

  /**
   * Takes an {@link AsyncStream} and returns another {@link AsyncStream}
   * instance to create an {@link AsyncStream} of differences.
   *
   * @param {AsyncStream<A>} xs The async stream of values.
   * @param {AsyncStream<A>} ys The other async stream of values.
   * @return {AsyncStream<A>} An async stream of the values that are not found
   * in the second async stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _difference(xs: AsyncStream<A>, ys: AsyncStream<A>): AsyncStream<A>
  function _difference(xs: AsyncStream<A>, ys?: AsyncStream<A>): AsyncStream<A> | ((ys: AsyncStream<A>) => AsyncStream<A>) {
    if (typeof ys !== 'undefined') {
      return async function* __difference() {
        const xList = await toArray(xs)

        for await (const y of ys()) {
          if (!xList.some(it => E.equals(it, y))) {
            yield y
          }
        }
      }
    }

    return function _difference_difference(my: AsyncStream<A>): AsyncStream<A> {
      return _difference(xs, my)
    }
  }

  return _difference
}
