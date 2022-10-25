import { MonadTask1 } from 'fp-ts/lib/MonadTask'

import { ApplicativePar } from './applicative'
import { Chain } from './chain'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { FromIO } from './transformations/from-io'
import { FromTask } from './transformations/from-task'
import { URI } from './uri'

/**
 * The `MonadTask` category instance for {@link AsyncStream}.
 */
export const MonadTask: MonadTask1<URI> = {
  URI,
  ap: ApplicativePar.ap,
  map: Functor.map,
  chain: Chain.chain,
  fromIO: FromIO.fromIO,
  fromTask: FromTask.fromTask,
  of: Pointed.of,
}
