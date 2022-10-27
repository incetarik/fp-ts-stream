import { fromIterable, toArray } from '../conversions'
import { Stream } from '../uri'

/**
 * Reverses a {@link Stream} and returns another one.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The input stream.
 * @return {Stream<A>} The output stream.
 */
export function reverse<A>(fa: Stream<A>): Stream<A> {
  return fromIterable(toArray(fa).reverse())
}
