import { Stream } from '../uri'

/**
 * Given an input a {@link Stream} of functions, `flap` returns a {@link Stream}
 * containing the results of applying each function to the given input.
 *
 * @export
 * @template A The value type.
 * @param {A} a The value.
 * @return {(fab: Stream<(a: A) => B>) => Stream<B>} A function that takes a
 * stream of functions.
 * 
 * @category mapping
 * @__PURE__
 */
export function flap<A>(a: A) {
  /**
   * Takes a {@link Stream} of functions to apply the previously given value
   * to them.
   *
   * @template B The return value type.
   * @param {Stream<(a: A) => B>} fab The function stream.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @category mapping
   * @__PURE__
   */
  return function _flap<B>(fab: Stream<(a: A) => B>): Stream<B> {
    return function* __flap() {
      for (const f of fab()) {
        yield f(a)
      }
    }
  }
}
