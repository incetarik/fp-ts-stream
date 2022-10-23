import { Stream } from '../uri'

/**
 * Appends an element to every member of a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {A} middle The element to append.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream
 * to modify.
 * 
 * @__PURE__
 */
export function appendAll<A>(middle: A) {
  /**
   * Takes a {@link Stream} to append the previously given value.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _appendAll(fa: Stream<A>): Stream<A> {
    return function* __appendAll() {
      for (const a of fa()) {
        yield a
        yield middle
      }
    }
  }
}
