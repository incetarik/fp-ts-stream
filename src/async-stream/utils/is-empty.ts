import { Task } from 'fp-ts/lib/Task'

import { AsyncStream } from '../uri'

/**
 * Tests whether an {@link AsyncStream} is empty.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {Task<boolean>} A task of `true` if the async stream was empty,
 * `false` otherwise.
 * 
 * @__PURE__
 */
export function isEmpty<A>(fa: AsyncStream<A>): Task<boolean> {
  return async function _isEmpty() {
    const gen = fa()
    const { done } = await gen.next()
    return !!done
  }
}

/**
 * Tests whether a {@link Stream} is not empty.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} ma The input async stream.
 * @return {Promise<boolean>} A task of `true` if the stream was not empty,
 * `false` otherwise.
 * 
 * @__PURE__
 */
export function isNotEmpty<A>(ma: AsyncStream<A>) {
  return () => isEmpty(ma)().then(value => !value)
}
