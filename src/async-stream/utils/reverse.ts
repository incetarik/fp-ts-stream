import { toArray } from '../conversions'
import { AsyncStream } from '../uri'

/**
 * Reverses an {@link AsyncStream} and returns another one.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {AsyncStream<A>} The output async stream.
 */
export function reverse<A>(fa: AsyncStream<A>): AsyncStream<A> {
  return async function* _reverse() {
    const items = await toArray(fa)
    for (const item of items.reverse()) {
      yield item
    }
  }
}
