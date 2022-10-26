import { identity } from 'fp-ts/lib/function'

import { fromIterable, toArray } from '../conversions'
import { AsyncStream } from '../uri'
import { take } from './take-left'

/**
 * Drops/skips the given amount of items from an {@link AsyncStream} from end to
 * the start.
 * 
 * **Warning: This function consumes the stream.**
 * 
 * - Negative values will be equal to {@link take} as much as the value.
 * - If `0` is passed, the stream itself will be returned.
 *
 * @export
 * @param {number} count The number of elements to drop.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another async stream that skips the given amount of
 * elements.
 * 
 * @__PURE__
 */
export function dropRight(count: number) {
  if (count < 0) return take(-count)
  else if (count == 0) return identity

  /**
   * Skips the previously given amount of elements from the given
   * {@link AsyncStream} and returns another one skips that much of amount
   * items.
   * 
   * **Warning: This function consumes the stream.**
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input stream.
   * @return {AsyncStream<A>} the output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _dropRight<A>(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __dropRight() {
      const items = await toArray(fa)
      const source = items.slice(0, -count)
      return fromIterable(source)
    }
  }
}
