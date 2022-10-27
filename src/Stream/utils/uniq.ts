import { Eq } from 'fp-ts/lib/Eq'

import { Stream } from '../uri'

/**
 * Removes the duplicates from a {@link Stream}, keeping the first occurence of
 * an element.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream to
 * keep its unique values.
 * 
 * @__PURE__
 */
export function uniq<A>(E: Eq<A>) {
  /**
   * Takes a {@link Stream} to keep its unique values.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _uniq(fa: Stream<A>): Stream<A> {
    return function* __uniq() {
      const as: A[] = []

      outer: for (const a of fa()) {
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
