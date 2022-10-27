import { Lazy } from 'fp-ts/lib/function'

import { fromIterable, toArray } from '../conversions'
import { Stream } from '../uri'
import { isEmpty } from './is-empty'

/**
 * Less strict version of {@link matchRight}.
 * 
 * **Warning: This function consumes the stream.**
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
export function matchRightW<B, A, C>(onEmpty: Lazy<B>, onNonEmpty: (init: Stream<A>, last: A) => C) {
  /**
   * Takes a {@link Stream} and returns the result value of the previously
   * given handler functions.
   * 
   * **Warning: This function consumes the stream.**
   *
   * @param {Stream<A>} fa The input stream.
   * @return {(B | C)} The output value.
   * 
   * @step 1
   * @category pattern matching
   * @__PURE__
   */
  return function _matchRightW(fa: Stream<A>): B | C {
    if (isEmpty(fa)) {
      return onEmpty()
    }
    else {
      const init = toArray(fa)
      const last = init.pop()!
      return onNonEmpty(fromIterable(init), last)
    }
  }
}

/**
 * Break a {@link Stream} into its initial elements and the last element.
 * 
 * **Warning: This function consumes the stream.**
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
export function matchRight<B, A>(onEmpty: Lazy<B>, onNonEmpty: (init: Stream<A>, last: A) => B) {
  return matchRightW<B, A, B>(onEmpty, onNonEmpty)
}

/**
 * Alias for {@link matchRight}.
 * 
 * **Warning: This function consumes the stream.**
 */
export const foldRight = matchRight
