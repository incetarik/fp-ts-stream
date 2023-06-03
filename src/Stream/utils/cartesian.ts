import type { Stream } from '../uri'

/**
 * Returns the {@link https://en.wikipedia.org/wiki/Cartesian_product Cartesian product}
 * of two {@link Stream}s. In other words, returns a {@link Stream} containing tuples of every
 * possible ordered combination of the two input {@link Stream}s.
 *
 * @export
 * @template A The type of the left hand side of the output tuple.
 * @param {Stream<A>} left The left hand side stream.
 * @return {<B>(right: Stream<B>) => Stream<[ A, B ]>} A function
 * that will take another stream to return the cartesian product of these.
 *
 * @__PURE__
 */
export function cartesian<A>(left: Stream<A>) {
  /**
   * Returns the {@link https://en.wikipedia.org/wiki/Cartesian_product Cartesian product}
   * of the previously given {@link Stream} and this {@link Stream}.
   *
   * @step 1
   * @template B The type of the right hand side of the output tuple.
   * @param {Stream<B>} right The right hand side stream.
   * @return {Stream<[ A, B ]>} A {@link Stream} of all `[A, B]` pairs.
   *
   * @__PURE__
   */
  return function _cartesian<B>(right: Stream<B>): Stream<[ A, B ]> {
    return function* __cartesian() {
      for (const lhs of left()) {
        for (const rhs of right()) {
          yield [ lhs, rhs ]
        }
      }
    }
  }
}
