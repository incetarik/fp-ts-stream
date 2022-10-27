import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { Stream } from '../uri'

/**
 * `every` tells if the provided refinement holds true for every element
 * in the {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {Refinement<Stream<A>, Stream<B>>} `true` if all the elements
 * returned `true` from the refinement function.
 * 
 * @__PURE__
 */
export function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<Stream<A>, Stream<B>>

/**
 * `every` tells if the provided predicate holds true for every element
 * in the {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {Predicate<Stream<A>>} `true` if all the elements
 * returned `true` from the refinement function.
 * 
 * @__PURE__
 */
export function every<A>(predicate: Predicate<A>): Predicate<Stream<A>>
export function every<A>(predicate: Predicate<A>): Predicate<Stream<A>> {
  return function _every(ma) {
    for (const a of ma()) {
      if (!predicate(a)) return false
    }

    return true
  }
}
