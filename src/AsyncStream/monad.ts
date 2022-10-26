import { Monad1 } from 'fp-ts/lib/Monad'

import { Applicative } from './applicative'
import { Chain } from './chain'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { URI } from './uri'

/**
 * The `Monad` category instance for {@link AsyncStream}.
 */
export const Monad: Monad1<URI> = {
  URI,
  ap: Applicative.ap,
  chain: Chain.chain,
  map: Functor.map,
  of: Pointed.of
}
