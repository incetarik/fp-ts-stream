import { AsyncStream } from '../uri'

/**
 * Appends an element to every member of a {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {A} middle The element to append.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to modify.
 * 
 * @__PURE__
 */
export function appendAll<A>(middle: A) {
  /**
   * Takes an {@link AsyncStream} to append the previously given value.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _appendAll(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __appendAll() {
      for await (const a of fa()) {
        yield a
        yield middle
      }
    }
  }
}
