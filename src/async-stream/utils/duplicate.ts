import { identity } from 'fp-ts/lib/function'

import { extend } from '../extend'
import { AsyncStream } from '../uri'

/**
 * `duplicate` returns an {@link AsyncStream} containing the whole input
 * {@link AsyncStream}, then to the input {@link AsyncStream} dropping the first
 * element, then to the input {@link AsyncStream} dropping the first two
 * elements, etc.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} wa The input async stream.
 * @return {AsyncStream<AsyncStream<A>>} The output async stream of async
 * streams.
 * 
 * @__PURE__
 */
export function duplicate<A>(wa: AsyncStream<A>): AsyncStream<AsyncStream<A>> {
  return extend<A, AsyncStream<A>>(identity)(wa)
}
