import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/HKT'
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
} from 'fp-ts/lib/Applicative'
import { Either } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { Separated } from 'fp-ts/lib/Separated'
import {
  filterE as witherableFilterE,
  wiltDefault,
  Witherable1,
  witherDefault,
} from 'fp-ts/lib/Witherable'

import { Compactable } from './compactable'
import { Filterable } from './filterable'
import { Foldable } from './foldable'
import { Functor } from './functor'
import { Traversable } from './traversable'
import { Stream, URI } from './uri'

/**
 * Partitions a structure with effects with given {@link Applicative} instance.
 *
 * @export
 * @template F The type of the applicative instance.
 * @param {Applicative<F>} F The applicative instance.
 * @return {<A, B, C>(
 *   f: (a: A) => HKT<F, Either<B, C>>
 * ) => (wa: Kind<URI, A>) => HKT<F, Separated<Kind<URI, B>, Kind<URI, C>>>} A
 * function that will map the value to a `HKT` of either of the mapped type `C`.
 * 
 * @category model
 * @__PURE__
 */
export function wilt<F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
  f: (a: A) => Kind3<F, R, E, Either<B, C>>
) => (wa: Kind<URI, A>) => Kind3<F, R, E, Separated<Kind<URI, B>, Kind<URI, C>>>
export function wilt<F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
  f: (a: A) => Kind3<F, R, E, Either<B, C>>
) => (wa: Kind<URI, A>) => Kind3<F, R, E, Separated<Kind<URI, B>, Kind<URI, C>>>
export function wilt<F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
  f: (a: A) => Kind2<F, E, Either<B, C>>
) => (wa: Kind<URI, A>) => Kind2<F, E, Separated<Kind<URI, B>, Kind<URI, C>>>
export function wilt<F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
  f: (a: A) => Kind2<F, E, Either<B, C>>
) => (wa: Kind<URI, A>) => Kind2<F, E, Separated<Kind<URI, B>, Kind<URI, C>>>
export function wilt<F extends URIS>(F: Applicative1<F>): <A, B, C>(
  f: (a: A) => Kind<F, Either<B, C>>
) => (wa: Kind<URI, A>) => Kind<F, Separated<Kind<URI, B>, Kind<URI, C>>>
export function wilt<F>(F: Applicative<F>): <A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (wa: Kind<URI, A>) => HKT<F, Separated<Kind<URI, B>, Kind<URI, C>>>

export function wilt<F>(F: Applicative<F>): <A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (wa: Kind<URI, A>) => HKT<F, Separated<Kind<URI, B>, Kind<URI, C>>> {
  const _wiltF = wiltDefault(Traversable, Compactable)(F)
  /**
   * Partitions a structure with effects with previously
   * given {@link Applicative}.
   *
   * @param {*} f The mapping function.
   * @return {(fa: Stream<A>) => HKT<F, Separated<Stream<B>, Stream<C>>>} A
   * function that will take the input stream and will return the `F` instance
   * of separated streams of type `B` and `C`.
   * 
   * @category model
   * @step 1
   * @__PURE__
   */
  return function _wilt(f) {
    /**
     * Takes a stream to filter with {@link Option}.
     *
     * @param {Stream<A>} fa The input stream.
     * @return {HKT<F, Stream<C>>} The output stream in `F` instance.
     * 
     * @category model
     * @step 2
     * @__PURE__
     */
    return function __wilt(fa) {
      return _wiltF(fa, f)
    }
  }
}

/**
 * Filters a structure with effects with given {@link Applicative} instance.
 *
 * @export
 * @template F The type of the applicative instance.
 * @param {Applicative<F>} F The applicative instance.
 * @return {<A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>>} A
 * function that will map the value to a `HKT` of option of the mapped type `B`.
 * 
 * @category model
 * @__PURE__
 */
export function wither<F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
  f: (a: A) => Kind3<F, R, E, Option<B>>
) => (ta: Kind<URI, A>) => Kind3<F, R, E, Kind<URI, B>>
export function wither<F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
  f: (a: A) => Kind3<F, R, E, Option<B>>
) => (ta: Kind<URI, A>) => Kind3<F, R, E, Kind<URI, B>>
export function wither<F extends URIS2>(F: Applicative2<F>): <A, E, B>(
  f: (a: A) => Kind2<F, E, Option<B>>
) => (ta: Kind<URI, A>) => Kind2<F, E, Kind<URI, B>>
export function wither<F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
  f: (a: A) => Kind2<F, E, Option<B>>
) => (ta: Kind<URI, A>) => Kind2<F, E, Kind<URI, B>>
export function wither<F extends URIS>(F: Applicative1<F>): <A, B>(
  f: (a: A) => Kind<F, Option<B>>
) => (ta: Kind<URI, A>) => Kind<F, Kind<URI, B>>
export function wither<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>>

export function wither<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>> {
  const _witherF = witherDefault(Traversable, Compactable)(F)

  /**
   * Filters a structure with effects with previously given {@link Applicative}.
   *
   * @param {*} f The mapping function.
   * @return {(fa: Stream<A>) => HKT<F, Stream<B>>} A function that will take
   * the input stream and will return the `F` instance of stream of type `B`.
   * 
   * @category model
   * @step 1
   * @__PURE__
   */
  return function _wither(f) {
    /**
     * Takes a stream to filter with {@link Option}.
     *
     * @param {Stream<A>} fa The input stream.
     * @return {HKT<F, Stream<B>>} The output stream in `F` instance.
     * 
     * @category model
     * @step 2
     * @__PURE__
     */
    return function __wither(fa) {
      return _witherF(fa, f)
    }
  }
}

/**
 * The `Witherable` category instance for {@link Stream}.
 * 
 * @category model
 */
export const Witherable: Witherable1<URI> = {
  URI,
  compact: Compactable.compact,
  filter: Filterable.filter,
  filterMap: Filterable.filterMap,
  foldMap: Foldable.foldMap,
  map: Functor.map,
  partition: Filterable.partition,
  partitionMap: Filterable.partitionMap,
  reduce: Foldable.reduce,
  reduceRight: Foldable.reduceRight,
  separate: Compactable.separate,
  sequence: Traversable.sequence,
  traverse: Traversable.traverse,
  wilt<F>(F: Applicative<F>): <A, B, C>(wa: Stream<A>, f: (a: A) => HKT<F, Either<B, C>>) => HKT<F, Separated<Stream<B>, Stream<C>>> {
    return function _wilt(wa, f) {
      return wilt(F)(f)(wa)
    }
  },
  wither<F>(F: Applicative<F>): <A, B>(ta: Stream<A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Stream<B>> {
    return function _wither(ta, f) {
      return wither(F)(f)(ta)
    }
  }
}

/**
 * Filter values inside a `F` context.
 * 
 * See `ReadonlyArray`'s `filterE` for an example of usage.
 */
export const filterE = witherableFilterE(Witherable)
