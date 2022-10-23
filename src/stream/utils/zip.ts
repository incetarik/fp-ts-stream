import { pipe } from 'fp-ts/lib/function'

import { fromIterable } from '../conversions'
import { map } from '../functor'
import { Stream } from '../uri'
import { zipArray } from './zip-array'

/**
 * Takes two {@link Stream}s and returns a {@link Stream} of corresponding
 * pairs as {@link Stream}s yielding single elements.
 *
 * @export
 * @template B The value type.
 * @param {Stream<B>} fb The input stream.
 * @return {(<A>(fa: Stream<A>) => Stream<Stream<A | B>>)} A function
 * that takes another stream to zip.
 * 
 * @see {@link zipArray}
 * 
 * @__PURE__
 */
export function zip<B>(fb: Stream<B>): <A>(fa: Stream<A>) => Stream<Stream<A | B>>

/**
 * Takes two {@link Stream}s and returns a {@link Stream} of corresponding
 * pairs as {@link Stream}s yielding single elements.
 *
 * @export
 * @template A The value of the first stream type.
 * @template B The value of the second stream type.
 * @param {Stream<A>} fa The first stream.
 * @param {Stream<B>} fb The second stream.
 * @return {Stream<Stream<A | B>>)} The output stream.
 * 
 * @see {@link zipArray}
 * 
 * @__PURE__
 */
export function zip<A, B>(fa: Stream<A>, fb: Stream<B>): Stream<Stream<A | B>>

export function zip<A, B>(
  fAOrB: Stream<A | B>,
  fb?: Stream<B>
): Stream<Stream<A | B>> | (<A>(ma: Stream<A>) => Stream<Stream<A | B>>) {
  if (typeof fb !== 'undefined') {
    return pipe(
      zipArray(fAOrB, fb),
      map(fromIterable)
    )
  }

  return function _zip<A>(fa: Stream<A>): Stream<Stream<A | B>> {
    return zip<A, B>(fa, fAOrB as Stream<B>)
  }
}

/**
 * Reverse of {@link zip}.
 * 
 * Takes a {@link Stream} of pairs and returns another {@link Stream} instance
 * yielding from both {@link Stream}s in-order.
 *
 * @export
 * @template A The value type of the first stream.
 * @template B The value type of the second stream.
 * @param {(Stream<Stream<A> | Stream<B>>)} mma The input stream of streams.
 * @return {(Stream<A | B>)} A stream of elements from both streams.
 * 
 * @__PURE__
 */
export function unzip<A, B>(mma: Stream<Stream<A> | Stream<B>>): Stream<A | B> {
  return function* _unzip() {
    for (const ma of mma()) {
      yield* ma()
    }
  }
}
