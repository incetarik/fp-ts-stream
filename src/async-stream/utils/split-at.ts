import { pipe } from 'fp-ts/lib/function'

import { Stream } from '../../stream/uri'
import { AsyncStream } from '../uri'
import { empty } from '../zero'
import { dropLeft } from './drop-left'
import { takeLeft } from './take-left'

/**
 * Splits an {@link AsyncStream} into two pieces, the first piece has max `n`
 * elements.
 *
 * @export
 * @param {number} n The number of elements the first stream will contain.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to split.
 * 
 * @__PURE__
 */
export function splitAt(n: number) {
  /**
   * Takes an {@link AsyncStream} to split at previously given index.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input stream.
   * @return {AsyncStream<AsyncStream<A>>} A new async stream of two async
   * streams.
   * 
   * @step 1
   * @__PURE__
   */
  return function _splitAt<A>(fa: AsyncStream<A>): AsyncStream<AsyncStream<A>> {
    return async function* __splitAt() {
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

/**
 * Splits an {@link AsyncStream} into two pieces, the first piece has max `n`
 * elements.
 *
 * @export
 * @param {number} n The number of elements the first stream will contain.
 * @return {(fa: AsyncStream<A>) => Stream<AsyncStream<A>>} A function that
 * takes an async stream to split.
 * 
 * @__PURE__
 */
export function splitAtStream(n: number) {
  /**
   * Takes an {@link AsyncStream} to split at previously given index.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input stream.
   * @return {Stream<AsyncStream<A>>} A new stream of two async
   * streams.
   * 
   * @step 1
   * @__PURE__
   */
  return function _splitAtStream<A>(fa: AsyncStream<A>): Stream<AsyncStream<A>> {
    return function* __splitAtStream() {
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
