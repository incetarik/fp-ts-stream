import { pipe } from 'fp-ts/lib/function'
import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { Stream } from '../uri'
import { reverse } from './reverse'
import { takeLeftWhile } from './take-left-while'

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link Stream}.
 * 
 * **Warning: This function consumes the stream.**
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
export function takeRightWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: Stream<A>) => Stream<B>

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link Stream}.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {<B extends A>(fb: Stream<B>) => Stream<B>} A function that takes 
 * a stream to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeRightWhile<A>(
  predicate: Predicate<A>
): <B extends A>(fb: Stream<B>) => Stream<B>

/**
 * Calculates the longest initial substream for which all elements satisfying
 * the specified predicate, creating a new {@link Stream}.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes 
 * a stream to take from the left as long as the condition holds true.
 * 
 * @__PURE__
 */
export function takeRightWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A>

export function takeRightWhile<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A> {
  /**
   * Takes a {@link Stream} to take from the beginning of the stream
   * as long as the previously given predicate holds true.
   * 
   * **Warning: This function consumes the stream.**
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _takeRightWhile(fa: Stream<A>) {
    return pipe(
      fa,
      reverse,
      takeLeftWhile(predicate)
    )
  }
}
