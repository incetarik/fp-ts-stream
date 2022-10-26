import { AsyncStream } from '../uri'

/**
 * Drops/skips the given amount of items from an {@link AsyncStream}.
 *
 * @export
 * @param {number} count The number of elements to drop.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another async stream that skips the given amount
 * of elements.
 * 
 * @__PURE__
 */
export function dropLeft(count: number) {
  /**
   * Skips the previously given amount of elements from the given
   * {@link AsyncStream} and returns another one skips that much of amount
   * items.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input stream.
   * @return {AsyncStream<A>} the output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _dropLeft<A>(fa: AsyncStream<A>): AsyncStream<A> {
    if (count === 0) return fa

    return async function* __dropLeft() {
      const gen = fa()
      for (; !(await gen.next()).done && count > 1; --count);
      yield* gen
    }
  }
}

/**
 * Drops/skips the given amount of items from an {@link AsyncStream}.
 *
 * @export
 * @param {number} count The number of elements to drop.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another async stream that skips the given amount
 * of elements.
 * 
 * @__PURE__
 */
export const skip = dropLeft
