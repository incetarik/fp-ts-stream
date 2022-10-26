import { AsyncStream } from '../uri'

/**
 * Less strict version of {@link prepend}.
 *
 * @export
 * @template B The value type.
 * @param {B} head The value to prepend to the async stream.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to modify.
 * 
 * @__PURE__
 */
export function prependW<B>(head: B) {
  /**
   * Takes an {@link AsyncStream} to prepend the previously given value.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {(AsyncStream<A | B>)} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _prepend<A>(fa: AsyncStream<A>): AsyncStream<A | B> {
    return async function* __prepend() {
      yield head
      yield* fa()
    }
  }
}

/**
 * Prepends an element to the front of the {@link AsyncStream}, creating a new
 * {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {A} head The value to prepend to the async stream.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to modify.
 * 
 * @__PURE__
 */
export function prepend<A>(head: A) {
  return prependW<A>(head)<A>
}
