import { AsyncStream } from '../uri'

/**
 * Returns an {@link AsyncStream} of length `n` with element `i` initialized
 * with `f(i)`.
 * 
 * *Note:* `n` is normalized to a non negative integer.
 *
 * @export
 * @template A The value type.
 * @param {number} n The number of elements.
 * @param {(i: number) => A | Promise<A>} f The item making function.
 * @return {AsyncStream<A>} The output stream.
 * 
 * @__PURE__
 */
export function makeBy<A>(n: number, f: (i: number) => A | Promise<A>): AsyncStream<A> {
  return async function* _makeBy() {
    if (n < 0) { n = -n }

    for (let i = 0; i < n; ++i) {
      yield await f(i)
    }
  }
}
