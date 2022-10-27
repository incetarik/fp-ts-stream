import { Applicative1 } from 'fp-ts/lib/Applicative'
import { pipe } from 'fp-ts/lib/function'

import { chain } from './chain'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { AsyncStream, URI } from './uri'

/**
 * The `ApplicativeSeq` category instance for {@link AsyncStream}.
 */
export const ApplicativeSeq: Applicative1<URI> = {
  URI,
  ap: _apSeq,
  map: Functor.map,
  of: Pointed.of,
}

function _apSeq<A, B>(fab: AsyncStream<(a: A) => B>, fa: AsyncStream<A>): AsyncStream<B> {
  return pipe(
    fab,
    chain(f => Functor.map(fa, f))
  )
}
