import { AsyncStream } from '../uri'

/**
 * Given an input an {@link AsyncStream} of functions, `flap` returns
 * an {@link AsyncStream} containing the results of applying each function
 * to the given input.
 *
 * @export
 * @template A The value type.
 * @param {A} a The value.
 * @return {(fab: AsyncStream<(a: A) => B>) => AsyncStream<B>} A function that
 * takes an async stream of functions.
 * 
 * @category mapping
 * @__PURE__
 */
export function flap<A>(a: A) {
  /**
   * Takes an {@link AsyncStream} of functions to apply the previously given
   * value to them.
   *
   * @template B The return value type.
   * @param {AsyncStream<(a: A) => B>} fab The function async stream.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @category mapping
   * @__PURE__
   */
  return function _flap<B>(fab: AsyncStream<(a: A) => B>): AsyncStream<B> {
    return async function* __flap() {
      for await (const f of fab()) {
        yield f(a)
      }
    }
  }
}
