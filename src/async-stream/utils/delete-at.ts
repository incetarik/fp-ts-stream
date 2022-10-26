import { identity } from 'fp-ts/lib/function'

import { AsyncStream } from '../uri'

/**
 * Removes/skips an element at given index.
 * 
 * *Note:* Negative indices will have no effect.
 *
 * @export
 * @param {number} i The index to exclude from the async stream.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to remove the item at index.
 * 
 * @__PURE__
 */
export function deleteAt(i: number) {
  if (i < 0) return identity

  /**
   * Takes an {@link AsyncStream} to remove the element at previously
   * given index.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {Stream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _deleteAt<A>(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __deleteAt() {
      for await (const a of fa()) {
        if (i-- === 0) continue
        yield a
      }
    }
  }
}
