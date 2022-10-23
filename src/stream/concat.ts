import { Stream } from './uri'

/**
 * Concatenates two {@link Stream}s into one.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} second The another stream to concat.
 * @return {(first: Stream<A>) => Stream<A>} A function that will take the
 * initial stream.
 * 
 * @__PURE__
 */
export function concat<A>(second: Stream<A>) {
  return /**#__PURE__ */ concatW<A>(second)<A>
}

/**
 * Less strict version of {@link concat}.
 *
 * @export
 * @template B The value type of the another stream.
 * @param {Stream<B>} second The another stream to concat.
 * @return {<A>(first: Stream<A>) => Stream<A | B>} A function that will take
 * the initial stream.
 * 
 * @__PURE__
 */
export function concatW<B>(second: Stream<B>) {
  /**
   * Takes a {@link Stream} to concat the previously given {@link Stream} to
   * it.
   *
   * @template A The value type.
   * @param {Stream<A>} first The initial stream.
   * @return {(Stream<A | B>)} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _concatW<A>(first: Stream<A>): Stream<A | B> {
    return function* __concatW() {
      yield* first()
      yield* second()
    }
  }
}
