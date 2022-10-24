import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Lazy } from 'fp-ts/lib/function'

import { Applicative } from './applicative'
import { Functor } from './functor'
import { Pointed } from './pointed'
import { AsyncStream, URI } from './uri'
import { Zero } from './zero'

/**
 * Less strict version of [`alt`](#alt).
 * 
 * The `W` suffix (short for **W**idening) means that the return types will be
 * merged.
 *
 * @export
 * @template B The other value type.
 * @param {Lazy<AsyncStream<B>>} that The lazy function providing the other
 * async stream.
 * 
 * @return {(fa: AsyncStream<A>) => AsyncStream<B | A>} A function that takes
 * an async stream and returns another stream whose elements are concatted with
 * the given one.
 * 
 * @category error handling
 * @__PURE__
 */
export function altW<B>(that: Lazy<AsyncStream<B>>) {
  /**
   * Takes an async stream to concat the prevoiusly given async stream with
   * this one.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} ma The input async stream.
   * @return {(AsyncStream<B | A>)} The output async stream.
   * @step 1
   * 
   * @category error handling
   * @__PURE__
   */
  return function _altW<A>(ma: AsyncStream<A>): AsyncStream<B | A> {
    return async function* __altW() {
      yield* ma()
      yield* that()()
    }
  }
}

/**
 * Concatenates the inputs to a single {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Lazy<AsyncStream<A>>} that The lazy function providing the other
 * async stream.
 * 
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream and returns another async stream whose elements are concatted
 * with the given one.
 */
export function alt<A>(that: Lazy<AsyncStream<A>>) {
  return altW(that)<A>
}

/**
 * The `Alternative` category instance for {@link AsyncStream}.
 */
export const Alternative: Alternative1<URI> = {
  URI,
  ap: Applicative.ap,
  map: Functor.map,
  of: Pointed.of,
  zero: Zero.zero,
  alt(fa, that) { return alt(that)(fa) },
}
