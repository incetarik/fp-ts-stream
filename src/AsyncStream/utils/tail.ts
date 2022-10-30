import { none, Option, some } from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Gets all but the first element of an {@link AsyncStream}, creating a new
 * {@link AsyncStream}, or `None` if the {@link AsyncStream} is empty.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input stream.
 * @return {Task<Option<AsyncStream<A>>>} A task of an option of an async stream
 * whose first element is excluded.
 * 
 * @__PURE__
 */
export function tail<A>(fa: AsyncStream<A>): Task<Option<AsyncStream<A>>> {
  return async function _tail() {
    const gen = fa()
    const { done } = await gen.next()

    if (done) return none
    return some(() => gen)
  }
}
