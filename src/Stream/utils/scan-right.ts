import { toArray } from '../conversions'
import { Stream } from '../uri'

/**
 * Fold a {@link Stream} from the right, keeping all intermediate results
 * instead of the final result.
 * 
 * **Warning: This function consumes the stream.**
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
export function scanRight<A, B>(b: B, f: (b: B, a: A) => B) {
  /**
   * Takes a {@link Stream} and `scan`s it from the end.
   * 
   * **Warning: This function consumes the stream.**
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _scanRight(fa: Stream<A>): Stream<B> {
    return function* __scanRight() {
      const last = b
      const as = toArray(fa)
      const bs = new Array(as.length)
      for (let i = as.length - 1; i >= 0; --i) {
        const a = as[ i ]
        b = f(b, a)
        bs[ i ] = b
      }

      for (const b of bs) yield b
      yield last
    }
  }
}
