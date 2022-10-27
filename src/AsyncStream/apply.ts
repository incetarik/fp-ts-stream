import {
  apFirst as applyApFirst,
  Apply1,
  apS as applyApS,
  apSecond as applyApSecond,
} from 'fp-ts/lib/Apply'

import { Applicative } from './applicative'
import { ApplicativeSeq } from './applicative-seq'
import { Functor } from './functor'
import { URI } from './uri'

/**
 * The `Apply` category instance for {@link AsyncStream}.
 * 
 * Same with {@link ApplyPar}
 */
export const Apply: Apply1<URI> = {
  URI,
  ap: Applicative.ap,
  map: Functor.map,
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 */
export const apFirst = applyApFirst(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 */
export const apSecond = applyApSecond(Apply)

/**
 * @category do notation
 */
export const apS = applyApS(Apply)

/**
 * The `ApplySeq` category instance for {@link AsyncStream}.
 */
export const ApplySeq: Apply1<URI> = {
  URI,
  ap: ApplicativeSeq.ap,
  map: Functor.map
}

/**
 * The `Apply` category instance for {@link AsyncStream}.
 */
export const ApplyPar = Apply
