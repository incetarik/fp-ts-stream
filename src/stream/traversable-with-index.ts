import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/HKT'
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
} from 'fp-ts/lib/Applicative'
import { TraversableWithIndex1 } from 'fp-ts/lib/TraversableWithIndex'

import { FoldableWithIndex } from './foldable'
import { FunctorWithIndex } from './functor'
import { sequence, traverse } from './traversable'
import { Stream, URI } from './uri'
import { append } from './utils/append'
import { zero } from './zero'

/**
 * Given an iterating function that returns a {@link HKT}, `traverse` applies
 * the iterating function with index to each element of the {@link Stream} and
 * then {@link sequence}-s the results using the provided `Applicative`.
 * 
 * E.g. suppose you have a {@link Stream} and you want to format each element
 * with a function that returns a result or an error as
 * `f = (i: number, a: A) => Either<Error, B>`, using `traverse` you can apply
 * `f` to all elements and directly obtain as a result an
 * `Either<Error, Stream<B>>` i.e. a `Stream<B>` if all the results are `B`,
 * or an `Error` if some of the results are `Error`s.
 *
 * @export
 * @template F The category type.
 * @param {Applicative<F>} F The applicative instance.
 * @return {<A, B>(f: (i: number, a: A) => HKT<F, B>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>>}  A function
 * that will take a stream of given `HKT` and will return that `HKT` containing
 * a stream of its type.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseWithIndex<F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
  f: (i: number, a: A) => Kind3<F, R, E, B>
) => (ta: Kind<URI, A>) => Kind3<F, R, E, Kind<URI, B>>
export function traverseWithIndex<F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
  f: (i: number, a: A) => Kind3<F, R, E, B>
) => (ta: Kind<URI, A>) => Kind3<F, R, E, Kind<URI, B>>
export function traverseWithIndex<F extends URIS2>(F: Applicative2<F>): <A, E, B>(
  f: (i: number, a: A) => Kind2<F, E, B>
) => (ta: Kind<URI, A>) => Kind2<F, E, Kind<URI, B>>
export function traverseWithIndex<F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
  f: (i: number, a: A) => Kind2<F, E, B>
) => (ta: Kind<URI, A>) => Kind2<F, E, Kind<URI, B>>
export function traverseWithIndex<F extends URIS>(F: Applicative1<F>): <A, B>(f: (i: number, a: A) => Kind<F, B>) => (ta: Kind<URI, A>) => Kind<F, Kind<URI, B>>
export function traverseWithIndex<F>(F: Applicative<F>): <A, B>(f: (i: number, a: A) => HKT<F, B>) => (ta: Kind<URI, A>) => HKT<F, Kind<URI, B>>
export function traverseWithIndex<F>(F: Applicative<F>) {
  /**
   * Traverses a {@link Stream} with given iterating function.
   *
   * @template A The value type.
   * @template B The output type.
   * @param {(i: number, a: A) => HKT<F, B>} f The mapping function.
   * @return {*} A function that will take a stream and traverse it.
   * 
   * @category traversing
   * @step 1
   * @__PURE__
   */
  return function _traverseWithIndex<A, B>(f: (i: number, a: A) => HKT<F, B>) {
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
    return function __traverseWithIndex(ta: Kind<URI, A>): HKT<F, Kind<URI, B>> {
      let fb = F.of(zero<B>())
      let index = 0

      for (const a of ta()) {
        const mapped
          = F.map(fb, (sb: Stream<B>) => (b: B) => append(b)(sb))

        fb = F.ap(mapped, f(index++, a))
      }

      return fb
    }
  }
}

/**
 * The `TraversableWithIndex` category instance for {@link Stream}.
 * 
 * @category traversing
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, number> = {
  URI,
  foldMap: FoldableWithIndex.foldMap,
  foldMapWithIndex: FoldableWithIndex.foldMapWithIndex,
  map: FunctorWithIndex.map,
  mapWithIndex: FunctorWithIndex.mapWithIndex,
  reduce: FoldableWithIndex.reduce,
  reduceRight: FoldableWithIndex.reduceRight,
  reduceRightWithIndex: FoldableWithIndex.reduceRightWithIndex,
  reduceWithIndex: FoldableWithIndex.reduceWithIndex,
  sequence<F>(F: Applicative<F>) {
    return function _sequence<A>(ta: Stream<HKT<F, A>>) {
      return sequence(F)(ta)
    }
  },
  traverse<F>(F: Applicative<F>) {
    return function _traverse<A, B>(ta: Stream<A>, f: (a: A) => HKT<F, B>) {
      return traverse(F)(f)(ta)
    }
  },
  traverseWithIndex<F>(F: Applicative<F>) {
    return function _traverseWithIndex<A, B>(ta: Stream<A>, f: (i: number, a: A) => HKT<F, B>) {
      return traverseWithIndex(F)(f)(ta)
    }
  }
}
