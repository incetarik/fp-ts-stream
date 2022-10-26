import { of as streamOf } from '../../Stream/pointed'
import { Stream } from '../../Stream/uri'
import { of } from '../pointed'
import { AsyncStream } from '../uri'

/**
 * Splits an {@link AsyncStream} into {@link AsyncStream} of {@link AsyncStream}
 * of given chunk size.
 *
 * @export
 * @param {number} n The chunk size.
 * @return {(fa: AsyncStream<A>) => AsyncStream<AsyncStream<A>>} A function that
 * takes an async stream and returns an async stream of async streams of given
 * chunks.
 * 
 * @__PURE__
 */
export function chunksOf(n: number) {
  /**
   * Takes an {@link AsyncStream} to produce chunks of previously given number.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<AsyncStream<A>>} The output async stream.
   * 
   * @__PURE__
   */
  return function _chunksOf<A>(fa: AsyncStream<A>): AsyncStream<AsyncStream<A>> {
    if (n <= 0) return of(fa)

    return async function* __chunksOf() {
      const genA = fa()

      let willBreak = false
      while (!willBreak) {
        yield async function* ___chunksOf() {
          for (let i = n; i > 0; --i) {
            const { value, done } = await genA.next()

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

/**
 * Splits an {@link AsyncStream} into {@link Stream} of {@link AsyncStream}
 * of given chunk size.
 *
 * @export
 * @param {number} n The chunk size.
 * @return {(fa: AsyncStream<A>) => Stream<AsyncStream<A>>} A function that
 * takes an async stream and returns a stream of async streams of given
 * chunks.
 * 
 * @__PURE__
 */
export function chunksOfStreams(n: number) {
  /**
   * Takes an {@link AsyncStream} to produce chunks of previously given number.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {Stream<AsyncStream<A>>} The output async stream.
   * 
   * @__PURE__
   */
  return function _chunksOfStreams<A>(fa: AsyncStream<A>): Stream<AsyncStream<A>> {
    if (n <= 0) return streamOf(fa)

    return function* __chunksOf() {
      const genA = fa()

      let willBreak = false
      while (!willBreak) {
        yield async function* ___chunksOf() {
          for (let i = n; i > 0; --i) {
            const { value, done } = await genA.next()

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

