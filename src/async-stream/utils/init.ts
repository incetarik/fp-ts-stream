import { none, Option, some } from 'fp-ts/lib/Option'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Gets all but the last element of an {@link AsyncStream}, creating a new
 * {@link AsyncStream}, or `None` if the stream was empty.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {Task<Option<AsyncStream<A>>>} A task of an option of output async
 * stream.
 * 
 * @__PURE__
 */
export function init<A>(fa: AsyncStream<A>): Task<Option<AsyncStream<A>>> {
  return async function _init() {
    const gen = fa()
    const { done, value } = await gen.next()

    if (done) return none
    return some(async function* _init() {
      let curr = await gen.next()
      if (curr.done) return

      yield value

      let last = curr.value
      while (!curr.done) {
        curr = await gen.next()
        if (curr.done) return

        yield last
        last = curr.value
      }
    })
  }
}
