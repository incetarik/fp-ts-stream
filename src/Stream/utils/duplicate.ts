import { identity } from 'fp-ts/lib/function'

import { extend } from '../extend'
import { Stream } from '../uri'

/**
 * `duplicate` returns a {@link Stream} containing the whole input
 * {@link Stream}, then to the input {@link Stream} dropping the first element,
 * then to the input {@link Stream} dropping the first two elements, etc.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} wa The input stream.
 * @return {Stream<Stream<A>>} The output stream of streams.
 * 
 * @__PURE__
 */
export function duplicate<A>(wa: Stream<A>): Stream<Stream<A>> {
  return extend<A, Stream<A>>(identity)(wa)
}
