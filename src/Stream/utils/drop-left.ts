import { Stream } from '../uri'

/**
 * Drops/skips the given amount of items from a {@link Stream}.
 *
 * @export
 * @param {number} count The number of elements to drop.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream and
 * returns another stream that skips the given amount of elements.
 * 
 * @__PURE__
 */
export function dropLeft(count: number) {
  /**
   * Skips the previously given amount of elements from the given {@link Stream}
   * and returns another one skips that much of amount items.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} the output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _dropLeft<A>(fa: Stream<A>): Stream<A> {
    if (count === 0) return fa

    return function* __dropLeft() {
      const gen = fa()
      for (; !gen.next().done && count > 1; --count);
      yield* gen
    }
  }
}

/**
 * Drops/skips the given amount of items from a {@link Stream}.
 *
 * @export
 * @param {number} count The number of elements to drop.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream and
 * returns another stream that skips the given amount of elements.
 * 
 * @__PURE__
 */
export const skip = dropLeft
