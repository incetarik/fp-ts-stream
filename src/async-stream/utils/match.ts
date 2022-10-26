import { Lazy } from 'fp-ts/lib/function'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'
import { isEmpty } from './is-empty'

/**
 * Less strict version of {@link match}.
 *
 * @export
 * @template B The type of the value on empty.
 * @template A The type of the streamed value.
 * @template C The type of the value on non-empty.
 * @param {Lazy<B> | Task<B>} onEmpty The lazy function that will be executed
 * if the async stream is empty.
 * 
 * @param {(fa: AsyncStream<A>) => C | Promise<C>} onNonEmpty The function that
 * will be executed if the async stream is not empty.
 * 
 * @return {(fa: AsyncStream<A>) => Task<B | C>} A function that takes an
 * async stream to match.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchW<B, A, C>(onEmpty: Lazy<B> | Task<B>, onNonEmpty: (fa: AsyncStream<A>) => C | Promise<C>) {
  /**
   * Takes an {@link AsyncStream} to match.
   *
   * @param {AsyncStream<A>} fa The async stream.
   * @return {Task<B | C>} The match value.
   * 
   * @category pattern matching
   * @__PURE__
   */
  return function _matchW(fa: AsyncStream<A>): Task<B | C> {
    return async function __matchW() {
      if (await isEmpty(fa)()) {
        return await onEmpty()
      }
      else {
        return await onNonEmpty(fa)
      }
    }
  }
}

/**
 * Matches an {@link AsyncStream} whether if that was empty or not.
 *
 * @export
 * @template B The type of the value on empty.
 * @template A The type of the streamed value.
 * @param {Lazy<B> | Task<B>} onEmpty The lazy function that will be executed
 * if the async stream is empty.
 * 
 * @param {(fa: AsyncStream<A>) => Promise<B>} onNonEmpty The function that will
 * be executed.
 * 
 * @return {(fa: AsyncStream<A>) => Promise<B>} A function that takes an
 * async stream to match.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function match<B, A>(onEmpty: Lazy<B> | Task<B>, onNonEmpty: (fa: AsyncStream<A>) => B | Promise<B>) {
  return matchW<B, A, B>(onEmpty, onNonEmpty)
}
