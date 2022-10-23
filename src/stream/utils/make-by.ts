import { Stream } from '../uri'

/**
 * Returns a {@link Stream} of length `n` with element `i` initialized with
 * `f(i)`.
 * 
 * *Note:* `n` is normalized to a non negative integer.
 *
 * @export
 * @template A The value type.
 * @param {number} n The number of elements.
 * @param {(i: number) => A} f The item making function.
 * @return {Stream<A>} The output stream.
 * 
 * @__PURE__
 */
export function makeBy<A>(n: number, f: (i: number) => A): Stream<A> {
  return function* _makeBy() {
    if (n < 0) { n = -n }

    for (let i = 0; i < n; ++i) {
      yield f(i)
    }
  }
}
