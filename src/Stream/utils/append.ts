import { Stream } from '../uri'

/**
 * Append an element to the end of the {@link Stream}, creating a new
 * {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {A} end The value that will be added to the stream.
 * @return {Stream<A>} Another stream that provides the given value at the end.
 * 
 * @__PURE__
 */
export function append<A>(end: A) {
  return /**#__PURE__ */ appendW<A>(end)<A>
}

/**
 * Less strict version of {@link append}.
 *
 * @export
 * @template B The input value type.
 * @param {B} end The element that will be added to the end of the stream.
 * @return {Stream<A | B>} Another stream that provides the given value at
 * the end.
 * 
 * @__PURE__
 */
export function appendW<B>(end: B) {
  /**
   * Takes a {@link Stream} to add the previously given input to the end
   * of it.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {(Stream<A | B>)} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _append<A>(fa: Stream<A>): Stream<A | B> {
    return function* __append() {
      yield* fa()
      yield end
    }
  }
}
