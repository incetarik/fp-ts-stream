import { toArray } from '../conversions'
import { Stream } from '../uri'
import { empty } from '../zero'

/**
 * Takes given amount of items from a {@link Stream} from the end to the start.
 * 
 * If negative value is passed, an empty {@link Stream} will be returned.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @param {number} count The number of elements to take.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream and
 * returns another stream that contains only given amount of elements.
 * 
 * @__PURE__
 */
export function takeRight(n: number) {
  /**
   * Takes previously given amount of elements from the given {@link Stream}
   * from the end to the start and returns another one contains that much
   * amount of items.
   * 
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _takeRight<A>(fa: Stream<A>): Stream<A> {
    return function* __takeRight() {
      if (n <= 0) return empty

      const as = toArray(fa)
      for (
        let limit = as.length, i = Math.max(limit - n, 0);
        n > 0 && i < limit;
        ++i, --n
      ) { yield as[ i ] }
    }
  }
}
