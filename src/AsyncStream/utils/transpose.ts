import { pipe } from 'fp-ts/lib/function'

import {
  fromIterable as streamFromIterable,
  toArray as streamToArray,
} from '../../Stream/conversions'
import { fromIterable, toArray } from '../conversions'
import { map } from '../functor'

import type { Stream } from '../../Stream/uri';
import type { AsyncStream } from "../uri";
/**
 * Transposes the rows and columns of a 2D {@link AsyncStream}.
 *
 * If some of the rows are shorter than the following rows, their elements are skipped.
 *
 * @export
 * @template A The type of the values.
 * @param {AsyncStream<AsyncStream<A>>} xs The stream of a stream of the values.
 * @return {AsyncStream<AsyncStream<A>>} A new stream of transposed values.
 *
 * @__PURE__
 */
export function transpose<A>(xs: AsyncStream<AsyncStream<A>>): AsyncStream<AsyncStream<A>> {
  return pipe(
    xs,
    map(toArray),
    transposeArray,
    map(fromIterable)
  )
}

/**
 * Transposes the rows and columns of a 2D {@link AsyncStream}.
 *
 * If some of the rows are shorter than the following rows, their elements are skipped.
 *
 * @export
 * @template A The type of the values.
 * @param {AsyncStream<Stream<A>>} xs The stream of a stream of the values.
 * @return {AsyncStream<Stream<A>>} A new stream of transposed values.
 *
 * @__PURE__
 */
export function transposeStream<A>(xs: AsyncStream<Stream<A>>): AsyncStream<Stream<A>> {
  return pipe(
    xs,
    map(streamToArray),
    transposeArray,
    map(streamFromIterable)
  )
}

/**
 * Transposes the rows and columns of a 2D {@link AsyncStream}.
 *
 * If some of the rows are shorter than the following rows, their elements are skipped.
 *
 * @export
 * @template A The type of the values.
 * @param {AsyncStream<Array<A>>} xs The stream of the array of the values.
 * @return {AsyncStream<Array<A>>} A new stream of transposed values.
 *
 * @__PURE__
 */
export function transposeArray<A>(xs: AsyncStream<Array<A>>): AsyncStream<Array<A>> {
  return async function* _transpose() {
    const sources = await toArray(xs)

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
