import { Eq } from 'fp-ts/lib/Eq'

import { toArray } from '../conversions'
import { Stream } from '../uri'

/**
 * Creates a {@link Stream} of unique values that included in all given
 * {@link Stream} using a {@link Eq} for equality comparisons.
 * 
 * The order and references of result values are determined by the first
 * {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality comparer instance.
 * @return {(xs: Stream<A>) => (ys: Stream<A>) => Stream<A>} A function that
 * takes a stream to modify.
 * 
 * @__PURE__
 */
export function intersection<A>(E: Eq<A>) {
  /**
   * Takes a {@link Stream} to get the intersection between that and the
   * other.
   *
   * @param {Stream<A>} xs The first stream.
   * @return {(ys: Stream<A>) => Stream<A>} A function that takes the
   * other stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _intersection(xs: Stream<A>): (ys: Stream<A>) => Stream<A>

  /**
   * Takes a {@link Stream} to get the intersection between that and the
   * other.
   *
   * @param {Stream<A>} xs The first stream.
   * @param {Stream<A>} ys The second stream.
   * @return {Stream<A>} A stream containing the intersections of the given
   * streams.
   * 
   * @step 1
   * @__PURE__
   */
  function _intersection(xs: Stream<A>, ys: Stream<A>): Stream<A>
  function _intersection(xs: Stream<A>, ys?: Stream<A>): Stream<A> | ((ys: Stream<A>) => Stream<A>) {
    if (typeof ys !== 'undefined') {
      return function* _intersection() {
        const genX = xs()
        let result: IteratorResult<A> = genX.next()
        if (result.done) return

        const collected = toArray(ys)

        while (!result.done) {
          const value = result.value

          if (collected.some(it => E.equals(it, value))) {
            yield value
          }

          result = genX.next()
        }
      }
    }

    return function _intersection_intersection(my: Stream<A>): Stream<A> {
      return _intersection(xs, my)
    }
  }

  return _intersection
}
