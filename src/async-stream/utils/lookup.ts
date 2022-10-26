import { pipe } from 'fp-ts/lib/function'
import { none, Option } from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'
import { dropLeft } from './drop-left'
import { head } from './head'
import { take } from './take-left'

/**
 * Provides a safe way to read a value at a particular index from
 * an {@link AsyncStream}.
 * 
 * If the index is negative, `None` will be returned.
 *
 * @export
 * @param {number} i The index to lookup.
 * @return {<A>(fa: AsyncStream<A>) => Task<Option<A>>} A function that takes a
 * stream to lookup at given index.
 * 
 * @__PURE__
 */
export function lookup(i: number): <A>(fa: AsyncStream<A>) => Task<Option<A>>

/**
 * Provides a safe way to read a value at a particular index from
 * an {@link AsyncStream}.
 * 
 * If the index is negative, `None` will be returned.
 *
 * @export
 * @param {number} i The index to lookup.
 * @param {AsyncStream<A>} fa The input stream
 * @return {Task<Option<A>>} An option of the element at index.
 * 
 * @__PURE__
 */
export function lookup<A>(i: number, fa: AsyncStream<A>): Task<Option<A>>
export function lookup<A>(i: number, fa?: AsyncStream<A>) {
  if (typeof fa === 'undefined') {
    return function _lookup(ma: AsyncStream<A>): Task<Option<A>> {
      return lookup(i, ma)
    }
  }
  else if (i < 0) { return none }
  else {
    return pipe(
      fa,
      dropLeft(i),
      take(1),
      head
    )
  }
}
