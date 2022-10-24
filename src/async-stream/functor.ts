import {
  bindTo as functorBindTo,
  Functor1,
  let as functorLet,
} from 'fp-ts/lib/Functor'
import { FunctorWithIndex1 } from 'fp-ts/lib/FunctorWithIndex'

import { AsyncStream, URI } from './uri'

/**
 * Maps a {@link AsyncStream} instance to another {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The new/mapped value type.
 * @param {(a: A) => B} f The mapper function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes
 * a {@link AsyncStream} to map.
 */
export function map<A, B>(f: (a: A) => B) {
  /**
   * Returns a {@link AsyncStream} from the given {@link AsyncStream} instance
   * after mapping its values with previously given function.
   *
   * @param {AsyncStream<A>} fa The input {@link AsyncStream}.
   * @return {AsyncStream<B>} The output {@link AsyncStream}.
   * 
   * @step 1
   * @__PURE__
   */
  return function _map(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __map() {
      for await (const a of fa()) {
        yield f(a)
      }
    }
  }
}

/**
 * Maps a {@link AsyncStream} instance to another {@link AsyncStream} with
 * index.
 *
 * @export
 * @template A The value type.
 * @template B The new/mapped value type.
 * @param {(i: number, a: A) => B} f The mapper function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes
 * a {@link AsyncStream} to map.
 */
export function mapWithIndex<A, B>(f: (i: number, a: A) => B) {
  /**
   * Returns a {@link AsyncStream} from the given {@link AsyncStream} instance
   * after mapping its values with previously given function.
   *
   * @param {AsyncStream<A>} fa The input {@link AsyncStream}.
   * @return {AsyncStream<B>} The output {@link AsyncStream}.
   * 
   * @step 1
   * @__PURE__
   */
  return function _mapWithIndex(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __mapWithIndex() {
      let i = 0
      for await (const a of fa()) {
        yield f(i++, a)
      }
    }
  }
}


/**
 * The `Functor` category instance for {@link AsyncStream}.
 */
export const Functor: Functor1<URI> = {
  URI,
  map(fa, f) { return map(f)(fa) },
}

/**
 * The `FunctionWithIndex` category instance for {@link AsyncStream}.
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
