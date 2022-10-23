import { Eq } from 'fp-ts/lib/Eq'

import { toArray } from '../conversions'
import { Stream } from '../uri'

/**
 * Creates a {@link Stream} of {@link Stream} values not included in the other
 * given {@link Stream} using a {@link Eq} for equality comparisons.
 * 
 * The order and references of result values are determined by the first
 * {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(xs: Stream<A>) => (ys: Stream<A>) => Stream<A>} A function that
 * takes a stream to provide the differences.
 * 
 * @__PURE__
 */
export function difference<A>(E: Eq<A>) {
  /**
   * Takes a {@link Stream} and returns another {@link Stream} instance to
   * create a {@link Stream} of differences.
   *
   * @param {Stream<A>} xs The stream of values.
   * @return {(ys: Stream<A>) => Stream<A>} A function that takes a stream
   * to exclude the items of it from the given stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _difference(xs: Stream<A>): (ys: Stream<A>) => Stream<A>

  /**
   * Takes a {@link Stream} and returns another {@link Stream} instance to
   * create a {@link Stream} of differences.
   *
   * @param {Stream<A>} xs The stream of values.
   * @param {Stream<A>} ys The other stream of values.
   * @return {Stream<A>} A stream of the values that are not found in the
   * second stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _difference(xs: Stream<A>, ys: Stream<A>): Stream<A>
  function _difference(xs: Stream<A>, ys?: Stream<A>): Stream<A> | ((ys: Stream<A>) => Stream<A>) {
    if (typeof ys !== 'undefined') {
      return function* __difference() {
        const xList = toArray(xs)

        for (const y of ys()) {
          if (!xList.some(it => E.equals(it, y))) {
            yield y
          }
        }
      }
    }

    return function _difference_difference(my: Stream<A>): Stream<A> {
      return _difference(xs, my)
    }
  }

  return _difference
}
