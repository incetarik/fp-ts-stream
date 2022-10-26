import { Refinement } from 'fp-ts/lib/Refinement'

import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'

/**
 * Creates a new {@link AsyncStream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement/predicate function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: AsyncStream<A>) => AsyncStream<B>

/**
 * Creates a new {@link AsyncStream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The refinement/predicate function.
 * @return {<B extends A>(fa: AsyncStream<A>) => AsyncStream<B>} A function that
 * takes an stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropLeftWhile<A>(
  predicate: AsyncPredicate<A>
): <B extends A>(fb: AsyncStream<B>) => AsyncStream<B>

/**
 * Creates a new {@link AsyncStream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The refinement/predicate function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropLeftWhile<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A>
export function dropLeftWhile<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A> {
  return function _dropLeftWhile(fa) {
    return async function* __dropLeftWhile() {
      const gen = fa()

      for await (const a of gen) {
        if (await predicate(a)) {
          continue
        }

        yield a
        yield* gen
        return
      }
    }
  }
}
