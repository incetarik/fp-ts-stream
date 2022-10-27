import { Stream } from '../uri'
import { empty } from '../zero'

/**
 * Takes given amount of items from a {@link Stream}.
 * 
 * If negative value is passed, an empty {@link Stream} will be returned.
 *
 * @export
 * @param {number} count The number of elements to take.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream and
 * returns another stream that contains only given amount of elements.
 * 
 * @__PURE__
 */
export function takeLeft(count: number) {
  /**
   * Takes previously given amount of elements from the given {@link Stream}
   * and returns another one contains that much amount of items.
   * 
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _take<A>(fa: Stream<A>): Stream<A> {
    if (count <= 0) return empty

    return function* __take() {
      for (const a of fa()) {
        yield a
        --count

        if (count == 0) break
      }
    }
  }
}

/**
 * Takes given amount of items from a {@link Stream}.
 *
 * @export
 * @param {number} count The number of elements to take.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream and
 * returns another stream that contains only given amount of elements.
 * 
 * @__PURE__
 */
export const take = takeLeft
