import { of } from '../pointed'
import { Stream } from '../uri'

/**
 * Splits a {@link Stream} into {@link Stream} of {@link Streams} of given
 * chunk size.
 *
 * @export
 * @param {number} n The chunk size.
 * @return {(fa: Stream<A>) => Stream<Stream<A>>} A function that takes a 
 * stream and returns a stream of streams of given chunks.
 * 
 * @__PURE__
 */
export function chunksOf(n: number) {
  /**
   * Takes a {@link Stream} to produce chunks of previously given number.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<Stream<A>>} The output stream.
   * 
   * @__PURE__
   */
  return function _chunksOf<A>(fa: Stream<A>): Stream<Stream<A>> {
    if (n <= 0) return of(fa)

    return function* __chunksOf() {
      const genA = fa()

      let willBreak = false
      while (!willBreak) {
        yield function* ___chunksOf() {
          for (let i = n; i > 0; --i) {
            const { value, done } = genA.next()

            if (done) {
              willBreak = true
              return
            }

            yield value
          }
        }
      }
    }
  }
}
