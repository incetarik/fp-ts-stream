import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { fromIterable, toArray } from '../conversions'
import { Stream } from '../uri'

/**
 * Creates a new {@link Stream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement from the end to the start.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement/predicate function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream
 * to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropRightWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: Stream<A>) => Stream<B>

/**
 * Creates a new {@link Stream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement from the end to the start.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The refinement/predicate function.
 * @return {<B extends A>(fa: Stream<A>) => Stream<B>} A function that takes a
 * stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropRightWhile<A>(
  predicate: Predicate<A>
): <B extends A>(fb: Stream<B>) => Stream<B>

/**
 * Creates a new {@link Stream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement from the end to the start.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The refinement/predicate function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a
 * stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropRightWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A>
export function dropRightWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A> {
  return function _dropRightWhile(fa) {
    const array = toArray(fa)
    for (let i = array.length - 1; i >= 0; --i) {
      if (predicate(array[ i ])) {
        continue
      }

      array.splice(i + 1)
      break
    }

    return fromIterable(array)
  }
}
