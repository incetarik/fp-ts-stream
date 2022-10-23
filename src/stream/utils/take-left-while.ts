import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { Stream } from '../uri'

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream
 * to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: Stream<A>) => Stream<B>

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {<B extends A>(fb: Stream<B>) => Stream<B>} A function that takes 
 * a stream to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(fb: Stream<B>) => Stream<B>

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes 
 * a stream to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeLeftWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A>

export function takeLeftWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A> {
  /**
   * Takes a {@link Stream} to take from the beginning of the stream
   * as long as the previously given predicate holds true.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _takeLeftWhile(fa: Stream<A>) {
    return function* __takeLeftWhile() {
      for (const a of fa()) {
        if (predicate(a)) {
          yield a
        }
        else {
          break
        }
      }
    }
  }
}
