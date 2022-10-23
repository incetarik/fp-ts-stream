import { Predicate } from 'fp-ts/lib/Predicate'

import { Stream } from '../uri'

/**
 * Check if a predicate holds true for any {@link Stream} member.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {(fa: Stream<A>) => boolean} A function that takes a stream and
 * returns a boolean.
 * 
 * @__PURE__
 */
export function some<A>(predicate: Predicate<A>) {
  /**
   * Takes a stream to check if any element is passes the previously given
   * predicate.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {boolean} `true` if any of the stream members passes from the
   * predicate, `false` otherwise.
   * 
   * @__PURE__
   */
  return function _some(fa: Stream<A>) {
    for (const a of fa()) {
      if (predicate(a)) {
        return true
      }
    }

    return false
  }
}

/**
 * Alias for {@link some}.
 */
export const exists = some
