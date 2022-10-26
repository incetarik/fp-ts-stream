import { none, Option, some } from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Gets the first element in an {@link AsyncStream}, or `None` if the
 * {@link AsyncStream} is empty.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {Task<Option<A>>} A task of an option of the first value in the
 * async stream.
 * 
 * @__PURE__
 */
export function head<A>(fa: AsyncStream<A>): Task<Option<A>> {
  return async function _head() {
    const gen = fa()
    const { value, done } = await gen.next()

    if (done) return none
    else {
      return some(value)
    }
  }
}
