import { Refinement } from 'fp-ts/lib/Refinement'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'

/**
 * `every` tells if the provided refinement holds true for every element
 * in the {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => Task<boolean>} `true` if all the
 * elements returned `true` from the refinement function.
 * 
 * @__PURE__
 */
export function every<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: AsyncStream<A>) => Task<boolean>

/**
 * `every` tells if the provided predicate holds true for every element
 * in the {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {PredAsyncPredicateicate<A>} predicate The predicate function.
 * @return {AsyncPredicate<AsyncStream<A>>} `true` if all the elements
 * returned `true` from the refinement function.
 * 
 * @__PURE__
 */
export function every<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<boolean>
export function every<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<boolean> {
  return function _every(ma) {
    return async function _every() {
      for await (const a of ma()) {
        if (!(await predicate(a))) return false
      }

      return true
    }
  }
}
