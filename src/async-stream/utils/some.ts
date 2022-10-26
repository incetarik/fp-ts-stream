import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'

/**
 * Check if a predicate holds true for any {@link AsyncStream} member.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => Task<boolean>} A function that takes an
 * async stream and returns a boolean.
 * 
 * @__PURE__
 */
export function some<A>(predicate: AsyncPredicate<A>) {
  /**
   * Takes an {@link AsyncStream} to check if any element is passes the
   * previously given predicate.
   *
   * @param {AsyncStream<A>} fa The input stream.
   * @return {Task<boolean>} `true` if any of the stream members passes from the
   * predicate, `false` otherwise.
   * 
   * @__PURE__
   */
  return function _some(fa: AsyncStream<A>) {
    return async function __some() {
      for await (const a of fa()) {
        if (await predicate(a)) {
          return true
        }
      }

      return false
    }
  }
}

/**
 * Alias for {@link some}.
 */
export const exists = some
