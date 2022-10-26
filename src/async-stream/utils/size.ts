import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Calculates the number of elements in an {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {number} The number of elements.
 * 
 * @__PURE__
 */
export function size<A>(fa: AsyncStream<A>): Task<number> {
  return async function _size() {
    let i = 0
    for await (const _ of fa()) i++
    return i
  }
}
