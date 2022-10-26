import { identity } from 'fp-ts/lib/function'

import { AsyncStream } from '../uri'

/**
 * Applies a function to the element at the specified index, creating
 * a new {@link AsyncStream}.
 * 
 * *Note*: If the index was negative, the {@link AsyncStream} will not be
 * modified.
 *
 * @export
 * @template A The value type.
 * @param {number} i The index of the element to modify.
 * @param {(a: A) => A | Promise<A>} f The function to modify the element.
 * @return {AsyncStream<A>} The stream whose value at given index is modified.
 * 
 * @__PURE__
 */
export function modifyAt<A>(i: number, f: (a: A) => A | Promise<A>) {
  if (i < 0) return identity

  /**
   * Takes an {@link AsyncStream} to modify its element at previously given
   * index and returns a new {@link AsyncStream}.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _modifyAt(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __modifyAt() {
      for await (const a of fa()) {
        if (i-- === 0) {
          yield await f(a)
          continue
        }

        yield a
      }
    }
  }
}
