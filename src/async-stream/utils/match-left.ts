import { Lazy } from 'fp-ts/lib/function'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Less strict version of {@link matchLeft}.
 *
 * @export
 * @template B The value type on empty.
 * @template A The value type on non empty.
 * @template C The result type of the non empty function.
 * @param {Lazy<B> | Task<B>} onEmpty The lazy function that will be executed
 * when the stream is empty.
 * 
 * @param {(head: A, tail: AsyncStream<A>) => C | Promise<C>} onNonEmpty The
 * function that will be executed when the async stream is not empty.
 * 
 * @return {(fa: AsyncStream<A>) => Task<B | C>} A function that takes an async
 * stream.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchLeftW<B, A, C>(onEmpty: Lazy<B> | Task<B>, onNonEmpty: (head: A, tail: AsyncStream<A>) => C | Promise<C>) {
  /**
   * Takes an {@link AsyncStream} and returns the result value of the previously
   * given handler functions.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {(B | C)} The output value.
   * 
   * @step 1
   * @category pattern matching
   * @__PURE__
   */
  return function _matchLeftW(fa: AsyncStream<A>): Task<B | C> {
    return async function __matchLeftW() {
      const gen = fa()
      const { value: head, done } = await gen.next()

      if (done) {
        return await onEmpty()
      }
      else {
        return await onNonEmpty(head, async function* _tail() { yield* gen })
      }
    }
  }
}

/**
 * Break an {@link AsyncStream} into its first element and remaining elements.
 *
 * @export
 * @template B The value type on empty.
 * @template A The value type on non empty.
 * @param {Lazy<B> | Task<B>} onEmpty The lazy function that will be executed
 * when the aync stream is empty.
 * 
 * @param {(head: A, tail: Stream<A>) => B | Promise<B>} onNonEmpty The function
 * that will be executed when the stream is not empty.
 * 
 * @return {(fa: Stream<A>) => Task<B>} A function that takes an async stream.
 * 
 * @category pattern matching
 * @__PURE__
 */
export function matchLeft<B, A>(onEmpty: Lazy<B> | Task<B>, onNonEmpty: (head: A, tail: AsyncStream<A>) => B | Promise<B>) {
  return matchLeftW<B, A, B>(onEmpty, onNonEmpty)
}

/**
 * Alias for {@link matchLeft}.
 */
export const foldLeft = matchLeft
