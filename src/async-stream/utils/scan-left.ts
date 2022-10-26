import { AsyncStream } from '../uri'

/**
 * Same as `reduce` but it carries over the intermediate steps.
 *
 * @export
 * @template A The value type.
 * @template B The output value type.
 * @param {B} b The initial value.
 * @param {(b: B, a: A) => B | Promise<B>} f The mapping function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream and returns another.
 * 
 * @__PURE__
 */
export function scanLeft<A, B>(b: B, f: (b: B, a: A) => B | Promise<B>) {
  /**
   * Takes an {@link AsyncStream} and `scan`s it from the beginning.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _scanLeft(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __scanLeft() {
      yield b
      for await (const a of fa()) {
        b = await f(b, a)
        yield b
      }
    }
  }
}
