import { rotate as arrayRotate } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'

import { concat } from '../concat'
import { toArray } from '../conversions'
import { AsyncStream } from '../uri'
import { dropLeft } from './drop-left'
import { take } from './take-left'

/**
 * Rotates an {@link AsyncStream} by `n` steps.
 * 
 * If the `n` is less than zero, the {@link AsyncStream} will be rotated to the
 * opposite direction and **this case will consume the stream**.
 * 
 * For `n` greater or equal to zero,
 * _this function will not consume the stream._
 *
 * @export
 * @param {number} n The number of times to rotate.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to rotate.
 * 
 * @__PURE__
 */
export function rotate(n: number) {
  /**
   * Takes an {@link AsyncStream} to rotate by previously given steps.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async AsyncStream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _rotate<A>(fa: AsyncStream<A>): AsyncStream<A> {
    if (n == 0) return fa
    if (n < 0) {
      return async function* __rotate() {
        const items = await toArray(fa)
        const rotated = arrayRotate(n)(items)
        for (const a of rotated) {
          yield a
        }
      }
    }

    const left = pipe(fa, dropLeft(n))
    const right = pipe(fa, take(n))
    return concat(right)(left)
  }
}
