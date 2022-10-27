import { Monoid } from 'fp-ts/lib/Monoid'

import { Stream } from '../uri'
import { intersperse } from './intersperse'

/**
 * Places an element between members of a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Monoid<A>} M The monoid instance.
 * @return {(middle: A) => (fa: Stream<A>) => A} A function that takes the
 * element to place between members of the stream.
 * 
 * @__PURE__
 */
export function intercalate<A>(M: Monoid<A>) {
  /**
   * Takes a value to place between members of a {@link Stream}.
   *
   * @param {A} middle The value to place.
   * @return {(fa: Stream<A>) => A} A function that takes a stream and returns
   * the value.
   * 
   * @step 1
   * @__PURE__
   */
  return function _intercalate(middle: A) {
    /**
     * Takes a stream and places the previously given element between the
     * members of the given stream.
     *
     * @param {Stream<A>} fa The input stream.
     * @return {A} The concatenated value with the previously given monoid
     * instance.
     * 
     * @step 2
     * @__PURE__
     */
    return function __intercalate(fa: Stream<A>): A {
      let curr = M.empty
      const interspersed = intersperse(middle)(fa)

      for (const a of interspersed()) {
        curr = M.concat(curr, a)
      }

      return curr
    }
  }
}

