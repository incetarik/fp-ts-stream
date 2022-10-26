import { Refinement } from 'fp-ts/lib/Refinement'

import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: AsyncStream<A>) => AsyncStream<B>

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {<B extends A>(fb: AsyncStream<B>) => AsyncStream<B>} A function that
 * takes an async stream to take from the left as long as the condition holds
 * true.
 * 
 * @__PURE__
 */
export function takeLeftWhile<A>(
  predicate: AsyncPredicate<A>
): <B extends A>(fb: AsyncStream<B>) => AsyncStream<B>

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes 
 * an async stream to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeLeftWhile<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A>

export function takeLeftWhile<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A> {
  /**
   * Takes an {@link AsyncStream} to take from the beginning of the stream
   * as long as the previously given predicate holds true.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _takeLeftWhile(fa: AsyncStream<A>) {
    return async function* __takeLeftWhile() {
      for await (const a of fa()) {
        if (await predicate(a)) {
          yield a
        }
        else {
          break
        }
      }
    }
  }
}
