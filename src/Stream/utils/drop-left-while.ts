import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { Stream } from '../uri'

/**
 * Creates a new {@link Stream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement.
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
export function dropLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: Stream<A>) => Stream<B>

/**
 * Creates a new {@link Stream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The refinement/predicate function.
 * @return {<B extends A>(fa: Stream<A>) => Stream<B>} A function that takes a
 * stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(fb: Stream<B>) => Stream<B>

/**
 * Creates a new {@link Stream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The refinement/predicate function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a
 * stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A>
export function dropLeftWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A> {
  return function _dropLeftWhile(fa) {
    return function* __dropLeftWhile() {
      const gen = fa()

      for (const a of gen) {
        if (predicate(a)) {
          continue
        }

        yield a
        yield* gen
        return
      }
    }
  }
}
