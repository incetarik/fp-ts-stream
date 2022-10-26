import { Eq } from 'fp-ts/lib/Eq'
import { pipe } from 'fp-ts/lib/function'
import { isSome } from 'fp-ts/lib/Option'
import { map as mapTask, Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'
import { findFirst } from './find-first'

/**
 * Tests if a value is a member of an {@link AsyncStream}.
 * 
 * Takes a {@link Eq} of `A` as a single argument which returns the function
 * to use to search for a value of type `A` in an {@link AsyncStream}.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(a: A) => (fa: AsyncStream<A>) => Task<boolean>} A function to
 * use to search for a value in the async stream.
 * 
 * @__PURE__
 */
export function elem<A>(E: Eq<A>) {
  /**
   * Takes an element to test if that is a member of an {@link AsyncStream}.
   *
   * @param {A} a The value to test if that is in the stream.
   * @return {(fa: AsyncStream<A>) => Task<boolean>} A function that will
   * take the async stream to search.
   * 
   * @step 1
   * @__PURE__
   */
  function _elem(a: A): (fa: AsyncStream<A>) => Task<boolean>

  /**
   * Takes an element to test if that is a member of an {@link AsyncStream}.
   *
   * @param {A} a The value to test if that is in the stream.
   * @param {AsyncStream<A>} fa The async stream to search the element.
   * @return {Task<boolean>} `true` if the element is a member of the async
   * stream, `false` otherwise.
   * 
   * @step 1
   * @__PURE__
   */
  function _elem(a: A, fa: AsyncStream<A>): Task<boolean>
  function _elem(a: A, fa?: AsyncStream<A>): ((fa: AsyncStream<A>) => Task<boolean>) | Task<boolean> {
    if (typeof fa !== 'undefined') {
      return pipe(fa, findFirst(_a => E.equals(a, _a)), mapTask(isSome))
    }

    return function __elem(ma: AsyncStream<A>): Task<boolean> {
      return _elem(a, ma)
    }
  }

  return _elem
}
