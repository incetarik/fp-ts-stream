import { Stream } from '../uri'

/**
 * Prepends an element to every member of a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {A} middle The element to prepend.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream
 * to modify.
 * 
 * @__PURE__
 */
export function prependAll<A>(middle: A) {
  /**
   * Takes a {@link Stream} to prepend the previously given value.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _prependAll(fa: Stream<A>): Stream<A> {
    return function* __prependAll() {
      for (const a of fa()) {
        yield middle
        yield a
      }
    }
  }
}
