import { none, Option, some } from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Gets the last element in an {@link AsyncStream}, or `None` if the
 * {@link AsyncStream} is empty.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {Task<Option<A>>} A task of an option of the last value.
 * 
 * @__PURE__
 */
export function last<A>(fa: AsyncStream<A>): Task<Option<A>> {
  return async function _last() {
    const gen = fa()
    const { done, value } = await gen.next()
    if (done) return none

    let last = value
    for await (const a of gen) {
      last = a
    }

    return some(last)
  }
}
