import { identity } from 'fp-ts/lib/function'

import { Stream } from '../uri'

/**
 * Applies a function to the element at the specified index, creating
 * a new {@link Stream}, or returning `None` if the index is out of
 * bounds.
 *
 * @export
 * @template A The value type.
 * @param {number} i The index of the element to modify.
 * @param {(a: A) => A} f The function to modify the element.
 * @return {Stream<A>} A function that takes a stream and returns a new stream
 * whose element at given index is modified.
 * 
 * @__PURE__
 */
export function modifyAt<A>(i: number, f: (a: A) => A) {
  if (i < 0) return identity

  /**
   * Takes a {@link Stream} to modify its element at previously given
   * index and returns a new {@link Stream.}
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _modifyAt(fa: Stream<A>): Stream<A> {
    return function* __modifyAt() {
      for (const a of fa()) {
        if (i-- === 0) {
          yield f(a)
          continue
        }

        yield a
      }
    }
  }
}
