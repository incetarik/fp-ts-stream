import { Eq } from 'fp-ts/lib/Eq'

import { Stream } from '../uri'

/**
 * Derives on {@link Eq} over the {@link Stream} of a given element type from
 * the {@link Eq} of that type.
 * 
 * The derived {@link Eq} defines two {@link Stream}s as equal if all elements
 * of both {@link Stream}s are compared equal pairwise with the given `E`.
 * 
 * In case of {@link Stream}s of different lengths, the result is non equality.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {Eq<Stream<A>>} Another equality instance for the stream of
 * type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getEq<A>(E: Eq<A>): Eq<Stream<A>> {
  return {
    equals(x, y) {
      const xIter = x()
      const yIter = y()

      while (true) {
        const currX = xIter.next()
        const currY = yIter.next()

        if (currX.done !== currY.done) return false
        if (currX.done) return true
        const xVal = currX.value
        const yVal = currY.value

        if (!E.equals(xVal, yVal)) return false
      }
    }
  }
}
