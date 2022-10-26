import { pipe } from 'fp-ts/lib/function'

import { map } from '../functor'
import { Stream } from '../uri'

/**
 * Takes two {@link Stream}s and returns a {@link Stream} of corresponding
 * pairs as a tuple of both elements.
 *
 * @export
 * @template B The value type.
 * @param {Stream<B>} fb The input stream.
 * @return {<A>(fa: Stream<A>) => Stream<readonly [ A, B ]>} A function that
 * takes another stream to zip.
 * 
 * @__PURE__
 */
export function zipArray<B>(fb: Stream<B>): <A>(fa: Stream<A>) => Stream<readonly [ A, B ]>

/**
 * Takes two {@link Stream}s and returns a {@link Stream} of corresponding
 * pairs as a tuple of both elements.
 *
 * @export
 * @template A The value of the first stream type.
 * @template B The value of the second stream type.
 * @param {Stream<A>} fa The first stream.
 * @param {Stream<B>} fb The second stream.
 * @return {Stream<readonly [ A, B ]>} The output stream.
 * 
 * @__PURE__
 */
export function zipArray<A, B>(fa: Stream<A>, fb: Stream<B>): Stream<readonly [ A, B ]>
export function zipArray<A, B>(fAOrB: Stream<A> | Stream<B>, fb?: Stream<B>): Stream<readonly [ A, B ]> | (<A>(fa: Stream<A>) => Stream<readonly [ A, B ]>) {
  if (typeof fb !== 'undefined') {
    return function* __zipArray() {
      const genA = fAOrB()
      const genB = fb()

      while (true) {
        const currA = genA.next()
        const currB = genB.next()

        if (currA.done || currB.done) return
        yield [ currA.value, currB.value ] as [ A, B ]
      }
    }
  }

  return function _zipArray<A>(ma: Stream<A>): Stream<readonly [ A, B ]> {
    return zipArray<A, B>(ma, fAOrB as Stream<B>)
  }
}

/**
 * Reverse of {@link zipArray}.
 * 
 * Takes a {@link Stream} of pairs and returns a tuple of {@link Stream}s.
 *
 * @export
 * @template A The value type of the first stream.
 * @template B The value type of the second stream.
 * @param {(Stream<readonly [ A, B ]>)} mma The input stream of streams.
 * @return {[ Stream<A>, Stream<B> ]} A tuple of elements from both streams.
 * 
 * @__PURE__
 */
export function unzipArray<A, B>(mma: Stream<readonly [ A, B ]>): [ Stream<A>, Stream<B> ] {
  return [
    pipe(mma, map(it => it[ 0 ])),
    pipe(mma, map(it => it[ 1 ]))
  ]
}
