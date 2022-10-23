import { Stream } from '../uri'

/**
 * Creates a {@link Stream} containing a value repeated the specified number
 * of times.
 *
 * *Note:* `n` is normalized to a non negative integer.
 * 
 * @export
 * @template A The value type.
 * @param {number} n The count of the repetition.
 * @param {A} a The value to replicate.
 * @return {Stream<A>} The output stream.
 * 
 * @__PURE__
 */
export function replicate<A>(n: number, a: A): Stream<A> {
  return function* _replicate() {
    while (n-- > 0) yield a
  }
}
