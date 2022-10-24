import {
  bindTo as functorBindTo,
  Functor1,
  let as functorLet,
} from 'fp-ts/lib/Functor'
import { FunctorWithIndex1 } from 'fp-ts/lib/FunctorWithIndex'

import { Stream, URI } from './uri'

/**
 * Maps a {@link Stream} instance to another {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The new/mapped value type.
 * @param {(a: A) => B} f The mapper function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes
 * a {@link Stream} to map.
 * 
 * @__PURE__
 */
export function map<A, B>(f: (a: A) => B) {
  /**
   * Returns a {@link Stream} from the given {@link Stream} instance after
   * mapping its values with previously given function.
   *
   * @param {Stream<A>} fa The input {@link Stream}.
   * @return {Stream<B>} The output {@link Stream}.
   * 
   * @step 1
   * @__PURE__
   */
  return function _map(fa: Stream<A>): Stream<B> {
    return function* __map() {
      for (const a of fa()) {
        yield f(a)
      }
    }
  }
}

/**
 * Maps a {@link Stream} instance to another {@link Stream} with index.
 *
 * @export
 * @template A The value type.
 * @template B The new/mapped value type.
 * @param {(i: number, a: A) => B} f The mapper function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes
 * a {@link Stream} to map.
 */
export function mapWithIndex<A, B>(f: (i: number, a: A) => B) {
  /**
   * Returns a {@link Stream} from the given {@link Stream} instance after
   * mapping its values with previously given function.
   *
   * @param {Stream<A>} fa The input {@link Stream}.
   * @return {Stream<B>} The output {@link Stream}.
   * 
   * @step 1
   */
  return function _mapWithIndex(fa: Stream<A>): Stream<B> {
    return function* __mapWithIndex() {
      let i = 0
      for (const a of fa()) {
        yield f(i++, a)
      }
    }
  }
}

/**
 * The `Functor` category instance for {@link Stream}.
 */
export const Functor: Functor1<URI> = {
  URI,
  map(fa, f) { return map(f)(fa) },
}

/**
 * The `FunctionWithIndex` category instance for {@link Stream}.
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  URI,
  map: Functor.map,
  mapWithIndex(fa, f) { return mapWithIndex(f)(fa) },
}

/**
 * @category do notation
 */
export const bindTo = functorBindTo(Functor)

/**
 * @category do notation
 */
const let_ = functorLet(Functor)
export { let_ as let }
