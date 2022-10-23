import { Lazy } from 'fp-ts/lib/function'

import { Stream } from '../uri'

/**
 * Less strict version of {@link matchLeft}.
 *
 * @export
 * @template B The value type on empty.
 * @template A The value type on non empty.
 * @template C The result type of the non empty function.
 * @param {Lazy<B>} onEmpty The lazy function that will be executed when the
 * stream is empty.
 * 
 * @param {(head: A, tail: Stream<A>) => C} onNonEmpty The function that will
 * be executed when the stream is not empty.
 * 
 * @return {(fa: Stream<A>) => B | C} A function that takes a stream.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchLeftW<B, A, C>(onEmpty: Lazy<B>, onNonEmpty: (head: A, tail: Stream<A>) => C) {
  /**
   * Takes a {@link Stream} and returns the result value of the previously
   * given handler functions.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {(B | C)} The output value.
   * 
   * @step 1
   * @category pattern matching
   * @__PURE__
   */
  return function _matchLeftW(fa: Stream<A>): B | C {
    const gen = fa()
    const { value: head, done } = gen.next()

    if (done) {
      return onEmpty()
    }
    else {
      return onNonEmpty(head, function* _tail() { yield* gen })
    }
  }
}

/**
 * Break a {@link Stream} into its first element and remaining elements.
 *
 * @export
 * @template B The value type on empty.
 * @template A The value type on non empty.
 * @param {Lazy<B>} onEmpty The lazy function that will be executed when the
 * stream is empty.
 * 
 * @param {(head: A, tail: Stream<A>) => B} onNonEmpty The function that will
 * be executed when the stream is not empty.
 * 
 * @return {(fa: Stream<A>) => B} A function that takes a stream.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchLeft<B, A>(onEmpty: Lazy<B>, onNonEmpty: (head: A, tail: Stream<A>) => B) {
  return matchLeftW<B, A, B>(onEmpty, onNonEmpty)
}

/**
 * Alias for {@link matchLeft}.
 */
export const foldLeft = matchLeft
