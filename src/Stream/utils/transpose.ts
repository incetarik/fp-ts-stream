import { pipe } from 'fp-ts/lib/function'

import { fromIterable, toArray } from '../conversions'
import { map } from '../functor'

import type { Stream } from "../uri";

/**
 * Transposes the rows and columns of a 2D {@link Stream}.
 *
 * If some of the rows are shorter than the following rows, their elements are skipped.
 *
 * @export
 * @template A The type of the values.
 * @param {Stream<Stream<A>>} xs The stream of a stream of the values.
 * @return {Stream<Stream<A>>} A new stream of transposed values.
 *
 * @__PURE__
 */
export function transpose<A>(xs: Stream<Stream<A>>): Stream<Stream<A>> {
  return pipe(
    xs,
    map(toArray),
    transposeArray,
    map(fromIterable)
  )
}

/**
 * Transposes the rows and columns of a 2D {@link Stream}.
 *
 * If some of the rows are shorter than the following rows, their elements are skipped.
 *
 * @export
 * @template A The type of the values.
 * @param {Stream<Array<A>>} xs The stream of the array of the values.
 * @return {Stream<Array<A>>} A new stream of transposed values.
 *
 * @__PURE__
 */
export function transposeArray<A>(xs: Stream<Array<A>>): Stream<Array<A>> {
  return function* _transpose() {
    const sources = toArray(xs)

    let i = 0
    while (true) {
      const current = [] as A[]

      for (const source of sources) {
        if (source.length <= i) continue
        current.push(source[ i ])
      }

      i++
      if (current.length) {
        yield current
      }
      else {
        break
      }
    }
  }
}
