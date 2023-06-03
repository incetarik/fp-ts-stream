import type { AsyncStream } from '../uri'

/**
 * Returns the {@link https://en.wikipedia.org/wiki/Cartesian_product Cartesian product}
 * of two {@link AsyncStream}s. In other words, returns a {@link AsyncStream} containing tuples of every
 * possible ordered combination of the two input {@link AsyncStream}s.
 *
 * @export
 * @template A The type of the left hand side of the output tuple.
 * @param {AsyncStream<A>} left The left hand side stream.
 * @return {<B>(right: AsyncStream<B>) => AsyncStream<[ A, B ]>} A function
 * that will take another stream to return the cartesian product of these.
 *
 * @__PURE__
 */
export function cartesian<A>(left: AsyncStream<A>) {
  /**
   * Returns the {@link https://en.wikipedia.org/wiki/Cartesian_product Cartesian product}
   * of the previously given {@link AsyncStream} and this {@link AsyncStream}.
   *
   * @step 1
   * @template B The type of the right hand side of the output tuple.
   * @param {AsyncStream<B>} right The right hand side stream.
   * @return {AsyncStream<[ A, B ]>} A {@link AsyncStream} of all `[A, B]` pairs.
   *
   * @__PURE__
   */
  return function _cartesian<B>(right: AsyncStream<B>): AsyncStream<[ A, B ]> {
    return async function* __cartesian() {
      for await (const lhs of left()) {
        for await (const rhs of right()) {
          yield [ lhs, rhs ]
        }
      }
    }
  }
}
