import { pipe } from 'fp-ts/lib/function'

import { map } from '../functor'
import { AsyncStream } from '../uri'

/**
 * Takes two {@link AsyncStream}s and returns a {@link AsyncStream} of
 * corresponding pairs as a tuple of both elements.
 *
 * @export
 * @template B The value type.
 * @param {AsyncStream<B>} fb The input async stream.
 * @return {<A>(fa: AsyncStream<A>) => AsyncStream<readonly [ A, B ]>} A
 * function that takes another async stream to zip.
 * 
 * @__PURE__
 */
export function zipArray<B>(fb: AsyncStream<B>): <A>(fa: AsyncStream<A>) => AsyncStream<readonly [ A, B ]>

/**
 * Takes two {@link AsyncStream}s and returns a {@link AsyncStream} of
 * corresponding pairs as a tuple of both elements.
 *
 * @export
 * @template A The value of the first stream type.
 * @template B The value of the second stream type.
 * @param {AsyncStream<A>} fa The first async stream.
 * @param {AsyncStream<B>} fb The second async stream.
 * @return {AsyncStream<readonly [ A, B ]>} The output async stream.
 * 
 * @__PURE__
 */
export function zipArray<A, B>(fa: AsyncStream<A>, fb: AsyncStream<B>): AsyncStream<readonly [ A, B ]>
export function zipArray<A, B>(fAOrB: AsyncStream<A> | AsyncStream<B>, fb?: AsyncStream<B>): AsyncStream<readonly [ A, B ]> | (<A>(fa: AsyncStream<A>) => AsyncStream<readonly [ A, B ]>) {
  if (typeof fb !== 'undefined') {
    return async function* __zipArray() {
      const genA = fAOrB()
      const genB = fb()

      while (true) {
        const [ currA, currB ] = await Promise.all([ genA.next(), genB.next() ])

        if (currA.done || currB.done) return
        yield [ currA.value, currB.value ] as [ A, B ]
      }
    }
  }

  return function _zipArray<A>(ma: AsyncStream<A>): AsyncStream<readonly [ A, B ]> {
    return zipArray<A, B>(ma, fAOrB as AsyncStream<B>)
  }
}

/**
 * Reverse of {@link zipArray}.
 * 
 * Takes an {@link AsyncStream} of pairs and returns a tuple of
 * {@link AsyncStream}s.
 *
 * @export
 * @template A The value type of the first stream.
 * @template B The value type of the second stream.
 * @param {(AsyncStream<readonly [ A, B ]>)} mma The input async stream of
 * async streams.
 * 
 * @return {[ AsyncStream<A>, AsyncStream<B> ]} A tuple of elements from both
 * async streams.
 * 
 * @__PURE__
 */
export function unzipArray<A, B>(mma: AsyncStream<readonly [ A, B ]>): [ AsyncStream<A>, AsyncStream<B> ] {
  return [
    pipe(mma, map(it => it[ 0 ])),
    pipe(mma, map(it => it[ 1 ]))
  ]
}
