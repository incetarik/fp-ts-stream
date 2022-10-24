import { AsyncStream } from './uri'

/**
 * Concatenates two {@link AsyncStream}s into one.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} second The another async stream to concat.
 * @return {(first: AsyncStream<A>) => AsyncStream<A>} A function that will
 * take the initial stream.
 * 
 * @__PURE__
 */
export function concat<A>(second: AsyncStream<A>) {
  return /**#__PURE__ */ concatW<A>(second)<A>
}

/**
 * Less strict version of {@link concat}.
 *
 * @export
 * @template B The value type of the another async stream.
 * @param {AsyncStream<B>} second The another async stream to concat.
 * @return {<A>(first: AsyncStream<A>) => AsyncStream<A | B>} A function that
 * will take the initial stream.
 * 
 * @__PURE__
 */
export function concatW<B>(second: AsyncStream<B>) {
  /**
   * Takes a {@link Stream} to concat the previously given {@link Stream} to
   * it.
   *
   * @template A The value type.
   * @param {Stream<A>} first The initial async stream.
   * @return {(Stream<A | B>)} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _concatW<A>(first: AsyncStream<A>): AsyncStream<A | B> {
    return async function* __concatW() {
      yield* first()
      yield* second()
    }
  }
}
