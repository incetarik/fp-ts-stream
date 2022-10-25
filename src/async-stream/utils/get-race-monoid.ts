import { Monoid } from 'fp-ts/lib/Monoid'

import { AsyncStream } from '../uri'
import { never } from '../zero'

/**
 * Monoid returning the first started {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @return {Monoid<AsyncStream<A>>} A monoid instance of async stream.
 * 
 * @category instances
 * @__PURE__
 */
export function getRaceMonoid<A = never>(): Monoid<AsyncStream<A>> {
  return {
    concat(x, y) {
      return async function* _concat() {
        yield* await Promise.race([ x(), y() ])
      }
    },
    empty: never,
  }
}
