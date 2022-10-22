import { Applicative1 } from 'fp-ts/lib/Applicative'

import { Functor } from './functor'
import { Pointed } from './pointed'
import { Stream, URI } from './uri'

/**
 * Applies a {@link Stream} of type `A` to {@link Stream} of functions
 * from `A` to `B`.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The source stream.
 * @return {(fab: Stream<(a: A) => B>) => Stream<B>} A function that takes
 * a {@link Stream} of functions.
 * 
 * @__PURE__
 */
export function ap<A>(fa: Stream<A>) {
  /**
   * Applies previously given {@link Stream} to the given {@link Stream} of
   * functions that take the items of the previously given {@link Stream} and
   * returns `B` values.
   *
   * @template B The output value type.
   * @param {Stream<(a: A) => B>} fab The function stream to apply the values
   * of the previously given stream to its functions returning `B` value.
   * 
   * @return {Stream<B>} The output stream.
   * @step 1
   * 
   * @__PURE__
   */
  return function _ap<B>(fab: Stream<(a: A) => B>): Stream<B> {
    return function* __ap() {
      for (const a of fa()) {
        for (const f of fab()) {
          yield f(a)
        }
      }
    }
  }
}

/**
 * The `Applicative` category instance for {@link Stream}.
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: Functor.map,
  of: Pointed.of,
  ap(fab, fa) { return ap(fa)(fab) }
}
