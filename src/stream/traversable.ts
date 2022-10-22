import {
  HKT,
  Kind,
  Kind2,
  Kind3,
  Kind4,
  URIS,
  URIS2,
  URIS3,
  URIS4,
} from 'fp-ts/HKT'
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4,
} from 'fp-ts/lib/Applicative'
import { identity } from 'fp-ts/lib/function'
import { Traversable1 } from 'fp-ts/lib/Traversable'

import { Foldable } from './foldable'
import { Functor } from './functor'
import { Stream, URI } from './uri'
import { append } from './utils/append'
import { zero } from './zero'

/**
 * Given an iterating function that returns a {@link HKT}, `traverse` applies
 * the iterating function to each element of the {@link Stream} and then
 * {@link sequence}-s the results using the provided `Applicative`.
 * 
 * E.g. suppose you have a {@link Stream} and you want to format each element
 * with a function that returns a result or an error as
 * `f = (a: A) => Either<Error, B>`, using `traverse` you can apply `f` to all
 * elements and directly obtain as a result an `Either<Error, Stream<B>>`
 * i.e. a `Stream<B>` if all the results are `B`, or an `Error` if some of the
 * results are `Error`s.
 *
 * @export
 * @template F The category type.
 * @param {Applicative<F>} F The applicative instance.
 * @return {<A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>>}  A function
 * that will take a stream of given `HKT` and will return that `HKT` containing
 * a stream of its type.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverse<F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => (ta: Kind<URI, A>) => Kind3<F, R, E, Kind<URI, B>>
export function traverse<F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => (ta: Kind<URI, A>) => Kind3<F, R, E, Kind<URI, B>>
export function traverse<F extends URIS2>(F: Applicative2<F>): <A, E, B>(
  f: (a: A) => Kind2<F, E, B>
) => (ta: Kind<URI, A>) => Kind2<F, E, Kind<URI, B>>
export function traverse<F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
  f: (a: A) => Kind2<F, E, B>
) => (ta: Kind<URI, A>) => Kind2<F, E, Kind<URI, B>>
export function traverse<F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<URI, A>) => Kind<F, Kind<URI, B>>
export function traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>>
export function traverse<F>(F: Applicative<F>) {
  /**
   * Traverses a {@link Stream} with given iterating function.
   *
   * @template A The value type.
   * @template B The output type.
   * @param {(a: A) => HKT<F, B>} f The mapping function.
   * @return {*} A function that will take a stream and traverse it.
   * 
   * @category traversing
   * @step 1
   * @__PURE__
   */
  return function _traverse<A, B>(f: (a: A) => HKT<F, B>) {
    /**
     * Traverses a {@link Stream} with given iterating function.
     *
     * @param {Kind<URI, A>} ta The input stream.
     * @return {*}  {HKT<F, Kind<URI, B>>} The traverse result.
     * 
     * @category traversing
     * @step 2
     * @__PURE__
     */
    return function __traverse(ta: Kind<URI, A>): HKT<F, Kind<URI, B>> {
      let fb = F.of(zero<B>())

      for (const a of ta()) {
        const mapped
          = F.map(fb, (sb: Stream<B>) => (b: B) => append(b)(sb))

        fb = F.ap(mapped, f(a))
      }

      return fb
    }
  }
}

/**
 * `sequence` takes a {@link Stream} where elements are {@link HKT} of `A` and
 * using an applicative of that {@link HKT}, returns an {@link HKT} of
 * {@link Stream}.
 * E.g. it can turn a `Stream<Either<Error, string>>` into an
 * `Either<Error, Stream<string>>`
 * 
 * `sequence` requires an `Applicative` of the {@link HKT} you are targeting,
 * e.g. to turn an `Stream<Either<E, A>>` into an `Either<E, Stream<A>>`, it
 * needs an `Applicative` for `Either`, to turn a `Stream<Option<A>>` into an
 * `Option<Stream<A>>` it needs an `Applicative` for `Option`.
 *
 * @export
 * @template F The category type.
 * @param {Applicative<F>} F The applicative instance.
 * @return {<A>(ta: Kind<URI, HKT<F, A>>) => HKT<F, Kind<URI, A>>} A function
 * that will take a stream of given `HKT` and will return that `HKT` containing
 * a stream of its type.
 * 
 * @category traversing
 * @__PURE__
 */
export function sequence<F extends URIS4>(F: Applicative4<F>): <S, R, E, A>(ta: Kind<URI, Kind4<F, S, R, E, A>>) => Kind4<F, S, R, E, Kind<URI, A>>
export function sequence<F extends URIS3>(F: Applicative3<F>): <R, E, A>(ta: Kind<URI, Kind3<F, R, E, A>>) => Kind3<F, R, E, Kind<URI, A>>
export function sequence<F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(ta: Kind<URI, Kind3<F, R, E, A>>) => Kind3<F, R, E, Kind<URI, A>>
export function sequence<F extends URIS2>(F: Applicative2<F>): <E, A>(ta: Kind<URI, Kind2<F, E, A>>) => Kind2<F, E, Kind<URI, A>>
export function sequence<F extends URIS2, E>(F: Applicative2C<F, E>): <A>(ta: Kind<URI, Kind2<F, E, A>>) => Kind2<F, E, Kind<URI, A>>
export function sequence<F extends URIS>(F: Applicative1<F>): <A>(ta: Kind<URI, Kind<F, A>>) => Kind<F, Kind<URI, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Kind<URI, HKT<F, A>>) => HKT<F, Kind<URI, A>>

export function sequence<F>(F: Applicative<F>): <A>(ta: Kind<URI, HKT<F, A>>) => HKT<F, Kind<URI, A>> {
  return /**#__PURE__ */traverse(F)(identity)
}

/**
 * The `Traversable` category instance for {@link Stream}.
 * 
 * @category traversing
 */
export const Traversable: Traversable1<URI> = {
  URI,
  foldMap: Foldable.foldMap,
  map: Functor.map,
  reduce: Foldable.reduce,
  reduceRight: Foldable.reduceRight,
  traverse<F>(F: Applicative<F>) {
    return function _traverse<A, B>(ta: Stream<A>, f: (a: A) => HKT<F, B>) {
      return traverse(F)(f)(ta)
    }
  },
  sequence<F>(F: Applicative<F>) {
    return function _sequence<A>(ta: Stream<HKT<F, A>>) {
      return sequence(F)(ta)
    }
  }
}
