import { fromIterable } from '../../Stream/conversions'
import { Stream } from '../../Stream/uri'
import { of } from '../pointed'
import { AsyncStream } from '../uri'
import { zero } from '../zero'

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
      const gen = fa()

      let step = await gen.next()
      let isActive = !step.done
      while (isActive) {
        let remaining = n
        yield async function* _step() {
          while (--remaining >= 0) {
            yield step.value
            step = await gen.next()
            if (step.done) {
              isActive = false
              return
            }
          }
        }
      }
    }
  }
}

/**
 * Splits an {@link AsyncStream} into {@link AsyncStream} of array
 * of given chunk size.
 *
 * @export
 * @param {number} n The chunk size.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A[]>} A function that
 * takes an async stream and returns an async stream of array of given
 * chunks.
 * 
 * @__PURE__
 */
export function arrayChunksOf(n: number) {
  /**
   * Takes an {@link AsyncStream} to produce chunks of previously given number.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A[]>} The output async stream.
   * 
   * @__PURE__
   */
  return function _arrayChunksOf<A>(fa: AsyncStream<A>): AsyncStream<A[]> {
    if (n <= 0) return of([])

    return async function* __arrayChunksOf() {
      const gen = fa()

      let current: A[] = new Array(n)
      while (true) {
        for (let i = 0; i < n; ++i) {
          const { value, done } = await gen.next()
          if (done) {
            current.splice(i)
            yield current
            return
          }

          current[ i ] = value
        }

        yield current
        current = new Array(n)
      }
    }
  }
}

/**
 * Splits an {@link AsyncStream} into {@link AsyncStream} of {@link Stream}
 * of given chunk size.
 *
 * @export
 * @param {number} n The chunk size.
 * @return {(fa: AsyncStream<A>) => AsyncStream<Stream<A>>} A function that
 * takes an async stream and returns an async stream of streams of given
 * chunks.
 * 
 * @__PURE__
 */
export function streamChunksOf(n: number) {
  /**
   * Takes an {@link AsyncStream} to produce chunks of previously given number.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<Stream<A>>} The output async stream.
   * 
   * @__PURE__
   */
  return function _streamChunksOf<A>(fa: AsyncStream<A>): AsyncStream<Stream<A>> {
    if (n <= 0) return zero<Stream<A>>()

    return async function* __streamChunksOf() {
      for await (const array of arrayChunksOf(n)(fa)()) {
        yield fromIterable(array)
      }
    }
  }
}
