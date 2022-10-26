import { MonadIO1 } from 'fp-ts/lib/MonadIO'

import { Applicative } from './applicative'
import { Chain } from './chain'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { FromIO } from './transformations/from-io'
import { URI } from './uri'

/**
 * The `MonadIO` category instance for {@link AsyncStream}.
 */
export const MonadIO: MonadIO1<URI> = {
  URI,
  ap: Applicative.ap,
  chain: Chain.chain,
  fromIO: FromIO.fromIO,
  map: Functor.map,
  of: Pointed.of,
}
