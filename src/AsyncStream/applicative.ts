import { Applicative1 } from 'fp-ts/lib/Applicative'

import { toArray } from './conversions'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { AsyncStream, URI } from './uri'
import { MaybeAsync } from './utils/maybe-async'

/**
 * Applies a {@link AsyncStream} of type `A` to {@link AsyncStream} of functions
 * from `A` to `B`.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The source async stream.
 * @return {(fab: AsyncStream<(a: A) => B>) => AsyncStream<B>} A function that
 * takes a {@link AsyncStream} of functions.
 * 
 * @__PURE__
 */
export function ap<A>(fa: AsyncStream<A>) {
  /**
   * Applies previously given {@link AsyncStream} to the
   * given {@link AsyncStream} of functions that take the items of the
   * previously given {@link AsyncStream} and returns `B` values.
   *
   * @template B The output value type.
   * @param {AsyncStream<(a: A) => B | Promise<B>>} fab The async function
   * stream to apply the values of the previously given async stream to its
   * functions returning `B` value.
   * 
   * @return {AsyncStream<B>} The output async stream.
   * @step 1
   * 
   * @__PURE__
   */
  return function _ap<B>(fab: AsyncStream<(a: A) => MaybeAsync<B>>): AsyncStream<B> {
    return async function* __ap() {
      const as$ = toArray(fa)
      const fabs$ = toArray(fab)

      const [ as, fabs ] = await Promise.all([ as$, fabs$ ])
      for (const a of as) {
        for (const fab of fabs) {
          yield await fab(a)
        }
      }
    }
  }
}

/**
 * The `Applicative` category instance for {@link AsyncStream}.
 * 
 * Same with {@link ApplicativePar}
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: Functor.map,
  of: Pointed.of,
  ap(fab, fa) { return ap(fa)(fab) }
}

/**
 * The `ApplicativePar` category instance for {@link AsyncStream}.
 */
export const ApplicativePar = Applicative
