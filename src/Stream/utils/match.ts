import { Lazy } from 'fp-ts/lib/function'

import { Stream } from '../uri'
import { isEmpty } from './is-empty'

/**
 * Less strict version of {@link match}.
 *
 * @export
 * @template B The type of the value on empty.
 * @template A The type of the streamed value.
 * @template C The type of the value on non-empty.
 * @param {Lazy<B>} onEmpty The lazy function that will be executed if the
 * stream is empty.
 * 
 * @param {(fa: Stream<A>) => C} onNonEmpty The function that will be executed
 * if the stream is not empty.
 * 
 * @return {(fa: Stream<A>) => B | C} A function that takes a stream to match.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchW<B, A, C>(onEmpty: Lazy<B>, onNonEmpty: (fa: Stream<A>) => C) {
  /**
   * Takes a {@link Stream} to match.
   *
   * @param {Stream<A>} fa The stream.
   * @return {B | C} The match value.
   * 
   * @category pattern matching
   * @__PURE__
   */
  return function _matchW(fa: Stream<A>): B | C {
    if (isEmpty(fa)) {
      return onEmpty()
    }
    else {
      return onNonEmpty(fa)
    }
  }
}

/**
 * Matches a {@link Stream} whether if that was empty or not.
 *
 * @export
 * @template B The type of the value on empty.
 * @template A The type of the streamed value.
 * @param {Lazy<B>} onEmpty The lazy function that will be executed if the
 * stream is empty.
 * 
 * @param {(fa: Stream<A>) => B} onNonEmpty The function that will be executed.
 * @return {(fa: Stream<A>) => B} A function that takes a stream to match.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function match<B, A>(onEmpty: Lazy<B>, onNonEmpty: (fa: Stream<A>) => B) {
  return matchW<B, A, B>(onEmpty, onNonEmpty)
}
