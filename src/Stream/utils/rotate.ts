import { rotate as arrayRotate } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'

import { concat } from '../concat'
import { fromIterable, toArray } from '../conversions'
import { Stream } from '../uri'
import { dropLeft } from './drop-left'
import { take } from './take-left'

/**
 * Rotates a {@link Stream} by `n` steps.
 * 
 * If the `n` is less than zero, the {@link Stream} will be rotated to the
 * opposite direction and **this case will consume the stream**.
 * 
 * For `n` greater or equal to zero,
 * _this function will not consume the stream._
 *
 * @export
 * @param {number} n The number of times to rotate.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream to
 * rotate.
 * 
 * @__PURE__
 */
export function rotate(n: number) {
  /**
   * Takes a {@link Stream} to rotate by previously given steps.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _rotate<A>(fa: Stream<A>): Stream<A> {
    if (n == 0) return fa
    if (n < 0) {
      return pipe(
        fa,
        toArray,
        arrayRotate(n),
        fromIterable
      )
    }

    const left = pipe(fa, dropLeft(n))
    const right = pipe(fa, take(n))
    return concat(right)(left)
  }
}
