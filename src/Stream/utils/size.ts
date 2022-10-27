import { Stream } from '../uri'

/**
 * Calculates the number of elements in a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The input stream.
 * @return {number} The number of elements.
 * 
 * @__PURE__
 */
export function size<A>(fa: Stream<A>): number {
  let i = 0
  for (const _ of fa()) i++
  return i
}
