import { AsyncStream } from '../uri'

/**
 * Append an element to the end of the {@link AsyncStream}, creating a new
 * {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {A} end The value that will be added to the stream.
 * @return {AsyncStream<A>} Another async stream that provides the given value
 * at the end.
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
 * @return {AsyncStream<A | B>} Another async stream that provides the given
 * value at the end.
 * 
 * @__PURE__
 */
export function appendW<B>(end: B) {
  /**
   * Takes an {@link AsyncStream} to add the previously given input to the end
   * of it.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input stream.
   * @return {(StreaAsyncStreamm<A | B>)} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _append<A>(fa: AsyncStream<A>): AsyncStream<A | B> {
    return async function* __append() {
      yield* fa()
      yield end
    }
  }
}
