import { toArray } from '../conversions'
import { AsyncStream } from '../uri'

/**
 * Fold an {@link AsyncStream} from the right, keeping all intermediate results
 * instead of the final result.
 * 
 * **Warning: This function consumes the stream.**
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
export function scanRight<A, B>(b: B, f: (b: B, a: A) => B | Promise<B>) {
  /**
   * Takes an {@link AsyncStream} and `scan`s it from the end.
   * 
   * **Warning: This function consumes the stream.**
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _scanRight(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __scanRight() {
      const last = b
      const as = await toArray(fa)
      const bs = new Array(as.length)
      for (let i = as.length - 1; i >= 0; --i) {
        const a = as[ i ]
        b = await f(b, a)
        bs[ i ] = b
      }

      for (const b of bs) yield b
      yield last
    }
  }
}
