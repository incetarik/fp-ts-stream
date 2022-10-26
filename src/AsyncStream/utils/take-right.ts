import { toArray } from '../conversions'
import { AsyncStream } from '../uri'
import { empty } from '../zero'

/**
 * Takes given amount of items from an {@link AsyncStream} from the end to the
 * start.
 * 
 * If negative value is passed, an empty {@link AsyncStream} will be returned.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @param {number} n The number of elements to take.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another stream that contains only given amount of
 * elements.
 * 
 * @__PURE__
 */
export function takeRight(n: number) {
  /**
   * Takes previously given amount of elements from the given
   * {@link AsyncStream} from the end to the start and returns another one
   * contains that much amount of items.
   * 
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _takeRight<A>(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __takeRight() {
      if (n <= 0) return empty

      const as = await toArray(fa)
      for (
        let limit = as.length, i = Math.max(limit - n, 0);
        n > 0 && i < limit;
        ++i, --n
      ) { yield as[ i ] }
    }
  }
}
