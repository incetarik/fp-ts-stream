import { AsyncStream } from '../uri'

/**
 * Prepends an element to every member of an {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {A} middle The element to prepend.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to modify.
 * 
 * @__PURE__
 */
export function prependAll<A>(middle: A) {
  /**
   * Takes an {@link AsyncStream} to prepend the previously given value.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _prependAll(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __prependAll() {
      for await (const a of fa()) {
        yield middle
        yield a
      }
    }
  }
}
