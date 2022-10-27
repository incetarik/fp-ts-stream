import { Stream } from './uri'

/**
 * Converts a {@link Stream} of type `A` to an array of `A`.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The stream source.
 * @return {A[]} The stream items as an array.
 * 
 * @__PURE__
 */
export function toArray<A>(fa: Stream<A>): A[] {
  return Array.from(fa())
}

/**
 * Converts an iterable to a {@link Stream} of type `A`.
 *
 * @export
 * @template A The value type.
 * @param {Iterable<A>} a The iterable input of `A` values.
 * @return {Stream<A>} A stream of of the values found in the given iterable.
 * 
 * @__PURE__
 */
export function fromIterable<A>(a: Iterable<A>): Stream<A> {
  return function* _fromIterable() {
    for (const item of a) {
      yield item
    }
  }
}
