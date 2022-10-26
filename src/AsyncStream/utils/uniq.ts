import { Eq } from 'fp-ts/lib/Eq'

import { AsyncStream } from '../uri'

/**
 * Removes the duplicates from an {@link AsyncStream}, keeping the first
 * occurence of an element.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * asnyc stream to keep its unique values.
 * 
 * @__PURE__
 */
export function uniq<A>(E: Eq<A>) {
  /**
   * Takes an {@link AsyncStream} to keep its unique values.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _uniq(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __uniq() {
      const as: A[] = []

      outer: for await (const a of fa()) {
        for (let i = 0, limit = as.length; i < limit; ++i) {
          const _a = as[ i ]
          if (E.equals(a, _a)) {
            continue outer
          }
        }

        yield a
        as.push(a)
      }
    }
  }
}
