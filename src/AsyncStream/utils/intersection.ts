import { Eq } from 'fp-ts/lib/Eq'

import { toArray } from '../conversions'
import { AsyncStream } from '../uri'

/**
 * Creates an {@link AsyncStream} of unique values that included in all given
 * {@link AsyncStream} using a {@link Eq} for equality comparisons.
 * 
 * The order and references of result values are determined by the first
 * {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality comparer instance.
 * @return {(xs: AsyncStream<A>) => (ys: AsyncStream<A>) => AsyncStream<A>} A
 * function that takes an async stream to modify.
 * 
 * @__PURE__
 */
export function intersection<A>(E: Eq<A>) {
  /**
   * Takes an {@link AsyncStream} to get the intersection between that and the
   * other.
   *
   * @param {AsyncStream<A>} xs The first async stream.
   * @return {(ys: AsyncStream<A>) => AsyncStream<A>} A function that takes the
   * other async stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _intersection(xs: AsyncStream<A>): (ys: AsyncStream<A>) => AsyncStream<A>

  /**
   * Takes an {@link AsyncStream} to get the intersection between that and the
   * other.
   *
   * @param {AsyncStream<A>} xs The first async stream.
   * @param {AsyncStream<A>} ys The second async stream.
   * @return {AsyncStream<A>} An async stream containing the intersections of
   * the given streams.
   * 
   * @step 1
   * @__PURE__
   */
  function _intersection(xs: AsyncStream<A>, ys: AsyncStream<A>): AsyncStream<A>
  function _intersection(xs: AsyncStream<A>, ys?: AsyncStream<A>): AsyncStream<A> | ((ys: AsyncStream<A>) => AsyncStream<A>) {
    if (typeof ys !== 'undefined') {
      return async function* _intersection() {
        const genX = xs()
        let result: IteratorResult<A> = await genX.next()
        if (result.done) return

        const collected = await toArray(ys)

        while (!result.done) {
          const value = result.value

          if (collected.some(it => E.equals(it, value))) {
            yield value
          }

          result = await genX.next()
        }
      }
    }

    return function _intersection_intersection(my: AsyncStream<A>): AsyncStream<A> {
      return _intersection(xs, my)
    }
  }

  return _intersection
}
