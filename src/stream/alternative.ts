import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Lazy } from 'fp-ts/lib/function'

import { Applicative } from './applicative'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { Stream, URI } from './uri'
import { Zero } from './zero'

/**
 * Less strict version of [`alt`](#alt).
 * 
 * The `W` suffix (short for **W**idening) means that the return types will be
 * merged.
 *
 * @export
 * @template B The other value type.
 * @param {Lazy<Stream<B>>} that The lazy function providing the other stream.
 * @return {(fa: Stream<A>) => Stream<B | A>} A function that takes a stream and
 * returns another stream whose elements are concatted with the given one.
 * 
 * @category error handling
 * @__PURE__
 */
export function altW<B>(that: Lazy<Stream<B>>) {
  /**
   * Takes a stream to concat the prevoiusly given stream with this one.
   *
   * @template A The value type.
   * @param {Stream<A>} ma The input stream.
   * @return {(Stream<B | A>)} The output stream.
   * @step 1
   * 
   * @category error handling
   * @__PURE__
   */
  return function _altW<A>(ma: Stream<A>): Stream<B | A> {
    return function* __altW() {
      yield* ma()
      yield* that()()
    }
  }
}

/**
 * Concatenates the inputs to a single {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Lazy<Stream<A>>} that The lazy function providing the other stream.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream and
 * returns another stream whose elements are concatted with the given one.
 */
export function alt<A>(that: Lazy<Stream<A>>) {
  return altW(that)<A>
}

/**
 * The `Alternative` category instance for {@link Stream}.
 */
export const Alternative: Alternative1<URI> = {
  URI,
  ap: Applicative.ap,
  map: Functor.map,
  of: Pointed.of,
  zero: Zero.zero,
  alt(fa, that) { return alt(that)(fa) },
}
