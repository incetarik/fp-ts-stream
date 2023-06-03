import { pipe } from 'fp-ts/lib/function'

import { reduce } from '../foldable'

import type { Stream } from '../uri'

/**
 * Map each item of a {@link Stream} to a key and count how mony map to
 * each key.
 *
 * @export
 * @template A The type of the item.
 * @param {(x: A) => string} f The key from value function.
 * @return {(input: Stream<A>) => Record<string, number>} A function that will
 * take a {@link Stream} and returns the counts of its mapped values.
 *
 * @__PURE__
 */
export function countBy<A>(f: (x: A) => string) {
  /**
   * Map each item of a {@link Stream} to a key and count how mony map to
   * each key.
   *
   * @step 1
   * @template A The type of the item.
   * @param {Stream<A>} input The input stream to count its values.
   * @return {Record<string, number>} A record containing the mapped values
   * of the stream and their values.
   *
   * @__PURE__
   */
  return function _countBy(input: Stream<A>): Record<string, number> {
    return pipe(
      input,
      reduce({} as Record<string, number>, (rec, a) => {
        const key = f(a)
        rec[ key ] ||= 0
        rec[ key ] += 1
        return rec
      })
    )
  }
}
