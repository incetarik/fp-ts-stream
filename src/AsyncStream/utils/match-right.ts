import { Lazy } from 'fp-ts/lib/function'
import { Task } from 'fp-ts/lib/Task'

import { fromIterable, toArray } from '../conversions'
import { AsyncStream } from '../uri'
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
 * @param {Lazy<B> | Task<B>} onEmpty The lazy function that will be executed
 * when the async stream is empty.
 * 
 * @param {(head: A, tail: AsyncStream<A>) => C | Promise<C>} onNonEmpty The
 * function that will be executed when the async stream is not empty.
 * 
 * @return {(fa: Stream<A>) => Task<B | C>} A function that takes an async
 * stream.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchRightW<B, A, C>(onEmpty: Lazy<B> | Task<B>, onNonEmpty: (init: AsyncStream<A>, last: A) => C | Promise<C>) {
  /**
   * Takes an {@link AsyncStream} and returns the result value of the previously
   * given handler functions.
   * 
   * **Warning: This function consumes the stream.**
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {Task<B | C>} The output value.
   * 
   * @step 1
   * @category pattern matching
   * @__PURE__
   */
  return function _matchRightW(fa: AsyncStream<A>): Task<B | C> {
    return async function __matchRightW() {
      if (await isEmpty(fa)()) {
        return await onEmpty()
      }
      else {
        const init = await toArray(fa)
        const last = init.pop()!
        return await onNonEmpty(fromIterable(init), last)
      }
    }
  }
}

/**
 * Break an {@link AsyncStream} into its initial elements and the last element.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template B The value type on empty.
 * @template A The value type on non empty.
 * @param {Lazy<B> | Task<B>} onEmpty The lazy function that will be executed
 * when the stream is empty.
 * 
 * @param {(head: A, tail: Stream<A>) => B | Promise<B>} onNonEmpty The function
 * that will be executed when the async stream is not empty.
 * 
 * @return {(fa: Stream<A>) => B | Promise<B>} A function that takes a stream.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchRight<B, A>(onEmpty: Lazy<B> | Task<B>, onNonEmpty: (init: AsyncStream<A>, last: A) => B | Promise<B>) {
  return matchRightW<B, A, B>(onEmpty, onNonEmpty)
}

/**
 * Alias for {@link matchRight}.
 * 
 * **Warning: This function consumes the stream.**
 */
export const foldRight = matchRight
