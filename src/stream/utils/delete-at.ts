import { identity } from 'fp-ts/lib/function'

import { Stream } from '../uri'

/**
 * Removes/skips an element at given index.
 * 
 * *Note:* Negative indices will have no effect.
 *
 * @export
 * @param {number} i The index to exclude from the stream.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream to
 * remove the item at index.
 * 
 * @__PURE__
 */
export function deleteAt(i: number) {
  if (i < 0) return identity

  /**
   * Takes a {@link Stream} to remove the element at previously
   * given index.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {*}  {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _deleteAt<A>(fa: Stream<A>): Stream<A> {
    return function* __deleteAt() {
      for (const a of fa()) {
        if (i-- === 0) continue
        yield a
      }
    }
  }
}
