import { Either, left, right } from 'fp-ts/lib/Either'
import { Filterable1 } from 'fp-ts/lib/Filterable'
import {
  FilterableWithIndex1,
  PredicateWithIndex,
  RefinementWithIndex,
} from 'fp-ts/lib/FilterableWithIndex'
import { pipe } from 'fp-ts/lib/function'
import { isSome, Option } from 'fp-ts/lib/Option'
import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'
import { Separated } from 'fp-ts/lib/Separated'

import { Compactable, separate } from './compactable'
import { Functor, FunctorWithIndex, mapWithIndex } from './functor'
import { Stream, URI } from './uri'

/**
 * Returns a {@link Stream} that produces values that passes from the refinement
 * function.
 *
 * @export
 * @template A The value type.
 * @template B The refined output value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream
 * and returns another stream passing the filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (fa: Stream<A>) => Stream<B>

/**
 * Returns a {@link Stream} that produces values that passes from the predicate
 * function.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {<B extends A>(fa: Stream<B>) => Stream<B>} A function that takes
 * a stream and returns another stream passing the filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filter<A>(predicate: Predicate<A>): <B extends A>(fa: Stream<B>) => Stream<B>

/**
 * Returns a {@link Stream} that produces values that passes from the predicate
 * function.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {*}  {(fa: Stream<A>) => Stream<A>} A function that takes
 * a stream and returns another stream passing the filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filter<A>(predicate: Predicate<A>): (fa: Stream<A>) => Stream<A> {
  /**
   * Takes a {@link Stream} and returns another one that will yield the elements
   * of the given {@link Stream} which pass the previously given predicate.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @category filtering
   * @__PURE__
   */
  return function _filter(fa: Stream<A>): Stream<A> {
    return function* __filter() {
      for (const a of fa()) {
        if (predicate(a)) {
          yield a
        }
      }
    }
  }
}

/**
 * Maps a {@link Stream} with an iterating function that takes the index and
 * the value of each element and returns an {@link Option}. It keeps only the
 * `Some` values dicarding the `None`s.
 * 
 * Same as [`filterMap`](#filterMap), but with an iterating function which takes
 * also the index as input.
 *
 * @export
 * @template A The value type.
 * @template B The mapped type.
 * @param {(i: number, a: A) => Option<B>} f The mapper function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream of
 * type `A` values and returns a stream of type `B` values.
 * 
 * @__PURE__
 */
export function filterMapWithIndex<A, B>(f: (i: number, a: A) => Option<B>) {
  /**
   * Takes a {@link Stream} to filter map it with index.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _filterMapWithIndex(fa: Stream<A>): Stream<B> {
    return function* __filterMapWithIndex() {
      let i = 0
      for (const a of fa()) {
        const value = f(i++, a)
        if (isSome(value)) {
          yield value.value
        }
      }
    }
  }
}

/**
 * Maps a {@link Stream} with an iterating function that takes
 * the value of each element and returns an {@link Option}. It keeps only the
 * `Some` values dicarding the `None`s.
 *
 * @export
 * @template A The value type.
 * @template B The mapped type.
 * @param {(a: A) => Option<B>} f The mapper function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream of
 * type `A` values and returns a stream of type `B` values.
 * 
 * @__PURE__
 */
export function filterMap<A, B>(f: (a: A) => Option<B>) {
  return /**#__PURE__*/ filterMapWithIndex<A, B>((_, a) => f(a))
}


/**
 * Maps a {@link Stream} with an iterating function that takes the index and the
 * value of each element and returns an boolean. It keeps only the elements
 * returning `true` and discards the others.
 *
 * @export
 * @template A The value type.
 * @template B The refined new value type.
 * @param {RefinementWithIndex<number, A, B>} refinementWithIndex The refinement
 * function with index.
 * 
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream
 * to filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filterWithIndex<A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: Stream<A>) => Stream<B>

/**
 * Maps a {@link Stream} with an iterating function that takes the index and the
 * value of each element and returns an boolean. It keeps only the elements
 * returning `true` and discards the others.
 *
 * @export
 * @template A The value type.
 * @template B The refined new value type.
 * @param {PredicateWithIndex<number, A>} predicateWithIndex The predicate
 * function with index.
 * 
 * @return {<B extends A>(fa: Stream<B>) => Stream<B>} A function that takes a
 * stream to filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filterWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(fa: Stream<B>) => Stream<B>

/**
 * Maps a {@link Stream} with an iterating function that takes the index and the
 * value of each element and returns an boolean. It keeps only the elements
 * returning `true` and discards the others.
 *
 * @export
 * @template A The value type.
 * @template B The refined new value type.
 * @param {PredicateWithIndex<number, A>} predicateWithIndex The predicate
 * function with index.
 * 
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream
 * to filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filterWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: Stream<A>) => Stream<A>
export function filterWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: Stream<A>) => Stream<A> {
  /**
   * Takes a {@link Stream} to filter with index.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @category filtering
   * @__PURE__
   */
  return function _filterWithIndex(fa) {
    return function* __filterWithIndex() {
      let i = 0
      for (const a of fa()) {
        if (predicateWithIndex(i++, a)) {
          yield a
        }
      }
    }
  }
}

/**
 * Given an iterating function that is a {@link Predicate} or
 * a {@link Refinement}, `partition` creates two new {@link Stream}s where the
 * `right` contains the original {@link Stream} for which the iterating function
 * is `true`, `left` contains the elements for which it is `false`.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: Stream<A>) => Separated<Stream<A>, Stream<B>>} A function
 * that takes a stream to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partition<A, B extends A>(refinement: Refinement<A, B>): (fa: Stream<A>) => Separated<Stream<A>, Stream<B>>

/**
 * Given an iterating function that is a {@link Predicate} or
 * a {@link Refinement}, `partition` creates two new {@link Stream}s where the
 * `right` contains the original {@link Stream} for which the iterating function
 * is `true`, `left` contains the elements for which it is `false`.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Predicate<A, B>} predicate The predicate function.
 * @return {<B extends A>(fa: Stream<A>) => Separated<Stream<A>, Stream<B>>} A
 * function that takes a stream to separate it based on a given condition
 * function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partition<A>(predicate: Predicate<A>): <B extends A>(fb: Stream<B>) => Separated<Stream<B>, Stream<B>>

/**
 * Given an iterating function that is a {@link Predicate} or
 * a {@link Refinement}, `partition` creates two new {@link Stream}s where the
 * `right` contains the original {@link Stream} for which the iterating function
 * is `true`, `left` contains the elements for which it is `false`.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {(fa: Stream<A>) => Separated<Stream<A>, Stream<A>>} A
 * function that takes a stream to separate it based on a given condition
 * function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partition<A>(predicate: Predicate<A>): (fb: Stream<A>) => Separated<Stream<A>, Stream<A>>
export function partition<A>(predicate: Predicate<A>): (fb: Stream<A>) => Separated<Stream<A>, Stream<A>> {
  return /**#__PURE__ */ partitionWithIndex<A>((_, a) => predicate(a))
}

/**
 * Same as [`partition`](#partition), but passing also the index to the
 * iterating function.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {RefinementWithIndex<number, A, B>} refinementWithIndex The refinement
 * function.
 * @return {(
 *   fa: Stream<A>
 * ) => Separated<Stream<A>, Stream<B>>} A function that takes a stream
 * to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionWithIndex<A, B extends A>(
  refinementWithIndex: RefinementWithIndex<number, A, B>
): (fa: Stream<A>) => Separated<Stream<A>, Stream<B>>

/**
 * Same as [`partition`](#partition), but passing also the index to the
 * iterating function.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {PredicateWithIndex<number, A, B>} predicateWithIndex The predicate
 * function.
 * @return {<B extends A>(
 *   fa: Stream<B>
 * ) => Separated<Stream<B>, Stream<B>>} A function that takes a stream
 * to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(fb: Stream<B>) => Separated<Stream<B>, Stream<B>>

/**
 * Same as [`partition`](#partition), but passing also the index to the
 * iterating function.
 *
 * @export
 * @template A The value type.
 * @param {PredicateWithIndex<number, A>} predicateWithIndex The predicate
 * function.
 * @return {(fa: Stream<A>) => Separated<Stream<A>, Stream<A>>} A function that
 * takes a stream to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: Stream<A>) => Separated<Stream<A>, Stream<A>>
export function partitionWithIndex<A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: Stream<A>) => Separated<Stream<A>, Stream<A>> {
  /**
   * Partitions a {@link Stream} based on the previously given function.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Separated<Stream<A>, Stream<A>>} The separated streams.
   */
  return function _partitionWithIndex(fa) {
    return pipe(
      fa,
      mapWithIndex((i, it) => predicateWithIndex(i, it) ? right(it) : left(it)),
      separate
    )
  }
}

/**
 * Given an iterating function that returns an {@link Either},
 * `partitionMap` applies the iterating function to each element and it creates
 * two {@link Stream}s where the `right` contains the values of `Right` results
 * and the `left` contains the values of `Left` results.
 *
 * @export
 * @template A The value type.
 * @template B The left type.
 * @template C The right type.
 * @param {(a: A) => Either<B, C>} f The iterating function.
 * @return {(fa: Stream<A>) => Separated<Stream<B>, Stream<C>>} A function that
 * takes a stream and returns a separate streams.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionMap<A, B, C>(f: (a: A) => Either<B, C>) {
  return /**#__PURE__ */partitionMapWithIndex<A, B, C>((_, a) => f(a))
}

/**
 * Same as [`partitionMap`](#partitionMap), but passing also the index to the
 * iterating function.
 *
 * @export
 * @template A The value type.
 * @template B The left type.
 * @template C The right type.
 * @param {(i: number, a: A) => Either<B, C>} f The iterating function.
 * @return {(fa: Stream<A>) => Separated<Stream<B>, Stream<C>>} A function that
 * takes a stream and returns a separate streams.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionMapWithIndex<A, B, C>(f: (i: number, a: A) => Either<B, C>) {
  /**
   * Takes a {@link Stream} to do partition based on the previously given
   * function.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Separated<Stream<B>, Stream<C>>} The separate output streams.
   * 
   * @category filtering
   * @__PURE__
   */
  return function _partitionMapWithIndex(fa: Stream<A>): Separated<Stream<B>, Stream<C>> {
    return pipe(
      fa,
      mapWithIndex(f),
      separate
    )
  }
}

/**
 * The `Filterable` category instance for {@link Stream}.
 */
export const Filterable: Filterable1<URI> = {
  URI,
  compact: Compactable.compact,
  separate: Compactable.separate,
  map: Functor.map,

  filter<A>(fa: Stream<A>, p: Predicate<A>) { return filter(p)(fa) },
  filterMap(fa, f) { return filterMap(f)(fa) },
  partition<A>(fa: Stream<A>, p: Predicate<A>) { return partition(p)(fa) },
  partitionMap(fa, f) { return partitionMap(f)(fa) },
}

/**
 * The `FilterableWithIndex` category instance for {@link Stream}.
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, number> = {
  URI,
  compact: Filterable.compact,
  filter: Filterable.filter,
  filterMap: Filterable.filterMap,
  filterMapWithIndex(fa, f) { return filterMapWithIndex(f)(fa) },
  filterWithIndex<A>(fa: Stream<A>, predicateWithIndex: PredicateWithIndex<number, A>) {
    return filterWithIndex(predicateWithIndex)(fa)
  },
  map: Functor.map,
  mapWithIndex: FunctorWithIndex.mapWithIndex,
  partition: Filterable.partition,
  partitionMap: Filterable.partitionMap,
  partitionMapWithIndex(fa, f) {
    return partitionMapWithIndex(f)(fa)
  },
  partitionWithIndex<A>(fa: Stream<A>, predicateWithIndex: PredicateWithIndex<number, A>) {
    return partitionWithIndex(predicateWithIndex)(fa)
  },
  separate: Compactable.separate,
}
