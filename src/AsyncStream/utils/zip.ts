import { pipe } from 'fp-ts/lib/function'

import { fromIterable } from '../conversions'
import { map } from '../functor'
import { AsyncStream } from '../uri'
import { zipArray } from './zip-array'

/**
 * Takes two {@link AsyncStream}s and returns a {@link AsyncStream} of
 * corresponding pairs as {@link AsyncStream}s yielding single elements.
 *
 * @export
 * @template B The value type.
 * @param {AsyncStream<B>} fb The input async stream.
 * @return {(<A>(fa: AsyncStream<A>) => AsyncStream<AsyncStream<A | B>>)} A
 * function that takes another async stream to zip.
 * 
 * @see {@link zipArray}
 * 
 * @__PURE__
 */
export function zip<B>(fb: AsyncStream<B>): <A>(fa: AsyncStream<A>) => AsyncStream<AsyncStream<A | B>>

/**
 * Takes two {@link AsyncStream}s and returns a {@link AsyncStream} of
 * corresponding pairs as {@link AsyncStream}s yielding single elements.
 *
 * @export
 * @template A The value of the first stream type.
 * @template B The value of the second stream type.
 * @param {AsyncStream<A>} fa The first async stream.
 * @param {AsyncStream<B>} fb The second async stream.
 * @return {AsyncStream<AsyncStream<A | B>>)} The output async stream.
 * 
 * @see {@link zipArray}
 * 
 * @__PURE__
 */
export function zip<A, B>(fa: AsyncStream<A>, fb: AsyncStream<B>): AsyncStream<AsyncStream<A | B>>

export function zip<A, B>(
  fAOrB: AsyncStream<A | B>,
  fb?: AsyncStream<B>
): AsyncStream<AsyncStream<A | B>> | (<A>(ma: AsyncStream<A>) => AsyncStream<AsyncStream<A | B>>) {
  if (typeof fb !== 'undefined') {
    return pipe(
      zipArray(fAOrB, fb),
      map(fromIterable)
    )
  }

  return function _zip<A>(fa: AsyncStream<A>): AsyncStream<AsyncStream<A | B>> {
    return zip<A, B>(fa, fAOrB as AsyncStream<B>)
  }
}

/**
 * Reverse of {@link zip}.
 * 
 * Takes an {@link AsyncStream} of pairs and returns another {@link AsyncStream}
 * instance yielding from both {@link AsyncStream}s in-order.
 *
 * @export
 * @template A The value type of the first stream.
 * @template B The value type of the second stream.
 * @param {(AsyncStream<AsyncStream<A> | AsyncStream<B>>)} mma The input async
 * stream of async streams.
 * 
 * @return {(AsyncStream<A | B>)} A async stream of elements from both streams.
 * 
 * @__PURE__
 */
export function unzip<A, B>(mma: AsyncStream<AsyncStream<A> | AsyncStream<B>>): AsyncStream<A | B> {
  return async function* _unzip() {
    for await (const ma of mma()) {
      yield* ma()
    }
  }
}
