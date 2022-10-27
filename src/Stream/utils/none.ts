import { not, Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { Stream } from '../uri'
import { every } from './every'

/**
 * `none` tells if the provided refinement holds `false` for every element
 * in the {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {Refinement<Stream<A>, Stream<B>>} `true` if all the elements
 * returned `false` from the refinement function.
 * 
 * @__PURE__
 */
export function none<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<Stream<A>, Stream<B>>

/**
 * `none` tells if the provided predicate holds false for none element
 * in the {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {Predicate<Stream<A>>} `true` if all the elements
 * returned `false` from the refinement function.
 * 
 * @__PURE__
 */
export function none<A>(predicate: Predicate<A>): Predicate<Stream<A>>
export function none<A>(predicate: Predicate<A>) {
  return every(not(predicate))
}
