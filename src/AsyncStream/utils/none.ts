import { Refinement } from 'fp-ts/lib/Refinement'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'
import { every } from './every'

/**
 * `none` tells if the provided refinement holds `false` for every element
 * in the {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {Task<boolean>} `true` if all the
 * elements returned `false` from the refinement function.
 * 
 * @__PURE__
 */
export function none<A, B extends A>(
  refinement: Refinement<A, B>
): (fa: AsyncStream<A>) => Task<boolean>

/**
 * `none` tells if the provided predicate holds false for none element
 * in the {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {AsyncPredicate<AsyncStream<A>>} `true` if all the elements
 * returned `false` from the refinement function.
 * 
 * @__PURE__
 */
export function none<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<boolean>
export function none<A>(predicate: AsyncPredicate<A>) {
  return every<A>(it => {
    const result = predicate(it)
    if (typeof result === 'object') {
      return result.then(value => !value)
    }
    else {
      return !result
    }
  })
}
