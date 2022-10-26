import { pipe } from 'fp-ts/lib/function'

import { Stream } from '../uri'
import { empty } from '../zero'
import { dropLeft } from './drop-left'
import { takeLeft } from './take-left'

/**
 * Splits a {@link Stream} into two pieces, the first piece has max `n`
 * elements.
 *
 * @export
 * @param {number} n The number of elements the first stream will contain.
 * @return {(fa: Stream<A>) => Stream<Stream<A>>} A function that takes a stream
 * to split.
 * 
 * @__PURE__
 */
export function splitAt(n: number) {
  /**
   * Takes a {@link Stream} to split at previously given index.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<Stream<A>>} A new stream of two streams.
   * 
   * @step 1
   * @__PURE__
   */
  return function _splitAt<A>(fa: Stream<A>): Stream<Stream<A>> {
    return function* __splitAt() {
      if (n <= 0) {
        yield empty
        yield fa
      }
      else {
        yield pipe(
          fa,
          takeLeft(n)
        )

        yield pipe(
          fa,
          dropLeft(n)
        )
      }
    }
  }
}
