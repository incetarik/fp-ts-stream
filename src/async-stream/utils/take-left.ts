import { AsyncStream } from '../uri'
import { empty } from '../zero'

/**
 * Takes given amount of items from an {@link AsyncStream}.
 * 
 * If negative value is passed, an empty {@link AsyncStream} will be returned.
 *
 * @export
 * @param {number} count The number of elements to take.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another async stream that contains only given
 * amount of elements.
 * 
 * @__PURE__
 */
export function takeLeft(count: number) {
  /**
   * Takes previously given amount of elements from the given
   * {@link AsyncStream} and returns another one contains that much amount
   * of items.
   * 
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _take<A>(fa: AsyncStream<A>): AsyncStream<A> {
    if (count <= 0) return empty

    return async function* __take() {
      for await (const a of fa()) {
        yield a
        --count

        if (count == 0) break
      }
    }
  }
}

/**
 * Takes given amount of items from an {@link AsyncStream}.
 *
 * @export
 * @param {number} count The number of elements to take.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another async stream that contains only given
 * amount of elements.
 * 
 * @__PURE__
 */
export const take = takeLeft
