import { Refinement } from 'fp-ts/lib/Refinement'

import { fromIterable, toArray } from '../conversions'
import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'

/**
 * Creates a new {@link AsyncStream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement from the end to the start.
 * 
 * **Warning: This function consumes the stream.**
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
export function dropRightWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: AsyncStream<A>) => AsyncStream<B>

/**
 * Creates a new {@link AsyncStream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement from the end to the start.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The refinement/predicate function.
 * @return {<B extends A>(fa: AsyncStream<A>) => AsyncStream<B>} A function that
 * takes an async stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropRightWhile<A>(
  predicate: AsyncPredicate<A>
): <B extends A>(fb: AsyncStream<B>) => AsyncStream<B>

/**
 * Creates a new {@link AsyncStream} which is a copy of the input dropping the
 * longest initial substream for which all element satisfy the specified
 * predicate/refinement from the end to the start.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The refinement/predicate function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream to drop its left while the condition holds.
 * 
 * @__PURE__
 */
export function dropRightWhile<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A>
export function dropRightWhile<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A> {
  return function _dropRightWhile(fa) {
    return async function* __dropRightWhile() {
      const array = await toArray(fa)
      for (let i = array.length - 1; i >= 0; --i) {
        if (await predicate(array[ i ])) {
          continue
        }

        array.splice(i + 1)
        break
      }

      return fromIterable(array)
    }
  }
}
