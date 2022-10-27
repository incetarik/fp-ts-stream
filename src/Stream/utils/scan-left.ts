import { Stream } from '../uri'

/**
 * Same as `reduce` but it carries over the intermediate steps.
 *
 * @export
 * @template A The value type.
 * @template B The output value type.
 * @param {B} b The initial value.
 * @param {(b: B, a: A) => B} f The mapping function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream and
 * returns another.
 * 
 * @__PURE__
 */
export function scanLeft<A, B>(b: B, f: (b: B, a: A) => B) {
  /**
   * Takes a {@link Stream} and `scan`s it from the beginning.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _scanLeft(fa: Stream<A>): Stream<B> {
    return function* __scanLeft() {
      yield b
      for (const a of fa()) {
        b = f(b, a)
        yield b
      }
    }
  }
}
