import { Eq } from 'fp-ts/lib/Eq'

import { Stream } from '../uri'

/**
 * Creates a {@link Stream} of unique values, in order, from all given
 * {@link Stream}s using a {@link Eq} for equality comparisons.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(xs: Stream<A>) => (ys: Stream<A>) => Stream<A>} A function that
 * takes streams.
 * 
 * @__PURE__
 */
export function union<A>(E: Eq<A>) {
  /**
   * Takes a {@link Stream} to union with another {@link Stream}.
   *
   * @param {Stream<A>} xs The first stream.
   * @return {(ys: Stream<A>) => Stream<A>} A function that takes the
   * other stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _union(xs: Stream<A>): (ys: Stream<A>) => Stream<A>

  /**
   * Takes a {@link Stream} to union with another {@link Stream}.
   *
   * @param {Stream<A>} xs The first stream.
   * @param {Stream<A>} ys The second stream.
   * @return {Stream<A>} A new stream containing unique values from both
   * streams.
   * 
   * @step 1
   * @__PURE__
   */
  function _union(xs: Stream<A>, ys: Stream<A>): Stream<A>
  function _union(xs: Stream<A>, ys?: Stream<A>): Stream<A> | ((ys: Stream<A>) => Stream<A>) {
    if (typeof ys !== 'undefined') {
      return function* __union() {
        const collected: A[] = []
        for (const y of ys()) {
          yield y
          collected.push(y)
        }

        for (const x of xs()) {
          if (!collected.some(it => E.equals(it, x))) {
            yield x
            collected.push(x)
          }
        }
      }
    }

    return function _union_union(my: Stream<A>): Stream<A> {
      return _union(xs, my)
    }
  }

  return _union
}
