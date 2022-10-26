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
import { AsyncStream, URI } from './uri'
import {
  AsyncPredicate,
  AsyncPredicateWithIndex,
} from './utils/async-predicate'

/**
 * Returns an {@link AsyncStream} that produces values that passes from the
 * refinement function.
 *
 * @export
 * @template A The value type.
 * @template B The refined output value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream and returns another async stream passing the filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (fa: AsyncStream<A>) => AsyncStream<B>

/**
 * Returns an {@link AsyncStream} that produces values that passes from the
 * predicate function.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {<B extends A>(fa: AsyncStream<B>) => AsyncStream<B>} A function
 * that takes an async stream and returns another async stream passing the
 * filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filter<A>(predicate: AsyncPredicate<A>): <B extends A>(fa: AsyncStream<B>) => AsyncStream<B>

/**
 * Returns a {@link Stream} that produces values that passes from the predicate
 * function.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes
 * an async stream and returns another async stream passing the filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filter<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => AsyncStream<A> {
  /**
   * Takes an {@link AsyncStream} and returns another one that will yield the
   * elements of the given {@link AsyncStream} which pass the previously given
   * predicate.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @category filtering
   * @__PURE__
   */
  return function _filter(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __filter() {
      for await (const a of fa()) {
        if (await predicate(a)) {
          yield a
        }
      }
    }
  }
}

/**
 * Maps an {@link AsyncStream} with an iterating function that takes the
 * index and the value of each element and returns an {@link Option}.
 * 
 * It keeps only the `Some` values dicarding the `None`s.
 * 
 * Same as [`filterMap`](#filterMap), but with an iterating function which takes
 * also the index as input.
 *
 * @export
 * @template A The value type.
 * @template B The mapped type.
 * @param {(i: number, a: A) => Option<B>} f The mapper function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream of type `A` values and returns an async stream of type `B`
 * values.
 * 
 * @__PURE__
 */
export function filterMapWithIndex<A, B>(f: (i: number, a: A) => Option<B>) {
  /**
   * Takes an {@link AsyncStream} to filter map it with index.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _filterMapWithIndex(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __filterMapWithIndex() {
      let i = 0
      for await (const a of fa()) {
        const value = f(i++, a)
        if (isSome(value)) {
          yield value.value
        }
      }
    }
  }
}

/**
 * Maps an {@link AsyncStream} with an iterating function that takes
 * the value of each element and returns an {@link Option}. It keeps only the
 * `Some` values dicarding the `None`s.
 *
 * @export
 * @template A The value type.
 * @template B The mapped type.
 * @param {(a: A) => Option<B>} f The mapper function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream of type `A` values and returns an async stream of type `B`
 * values.
 * 
 * @__PURE__
 */
export function filterMap<A, B>(f: (a: A) => Option<B>) {
  return /**#__PURE__*/ filterMapWithIndex<A, B>((_, a) => f(a))
}


/**
 * Maps an {@link AsyncStream} with an iterating function that takes the index
 * and the value of each element and returns an boolean.
 * 
 * It keeps only the elements returning `true` and discards the others.
 *
 * @export
 * @template A The value type.
 * @template B The refined new value type.
 * @param {RefinementWithIndex<number, A, B>} refinementWithIndex The refinement
 * function with index.
 * 
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream to filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filterWithIndex<A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: AsyncStream<A>) => AsyncStream<B>

/**
 * Maps an {@link AsyncStream} with an iterating function that takes the index
 * and the value of each element and returns an boolean.
 * 
 * It keeps only the elements returning `true` and discards the others.
 *
 * @export
 * @template A The value type.
 * @template B The refined new value type.
 * @param {AsyncPredicateWithIndex<number, A>} predicateWithIndex The predicate
 * function with index.
 * 
 * @return {<B extends A>(fa: AsyncStream<B>) => AsyncStream<B>} A function
 * that takes an async stream to filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filterWithIndex<A>(predicateWithIndex: AsyncPredicateWithIndex<number, A>): <B extends A>(fa: AsyncStream<B>) => AsyncStream<B>

/**
 * Maps an {@link AsyncStream} with an iterating function that takes the index
 * and the value of each element and returns an boolean.
 * 
 * It keeps only the elements returning `true` and discards the others.
 *
 * @export
 * @template A The value type.
 * @template B The refined new value type.
 * @param {AsyncPredicateWithIndex<number, A>} predicateWithIndex The predicate
 * function with index.
 * 
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream to filter.
 * 
 * @category filtering
 * @__PURE__
 */
export function filterWithIndex<A>(predicateWithIndex: AsyncPredicateWithIndex<number, A>): (fa: AsyncStream<A>) => AsyncStream<A>
export function filterWithIndex<A>(predicateWithIndex: AsyncPredicateWithIndex<number, A>): (fa: AsyncStream<A>) => AsyncStream<A> {
  /**
   * Takes an {@link AsyncStream} to filter with index.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @category filtering
   * @__PURE__
   */
  return function _filterWithIndex(fa) {
    return async function* __filterWithIndex() {
      let i = 0
      for await (const a of fa()) {
        if (await predicateWithIndex(i++, a)) {
          yield a
        }
      }
    }
  }
}

/**
 * Given an iterating function that is a {@link Predicate} or
 * a {@link Refinement}, `partition` creates two new {@link AsyncStream}s where
 * the `right` contains the original {@link AsyncStream} for which the
 * iterating function is `true`, `left` contains the elements for which it
 * is `false`.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<B>>} A function
 * that takes an async stream to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partition<A, B extends A>(refinement: Refinement<A, B>): (fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<B>>

/**
 * Given an iterating function that is a {@link Predicate} or
 * a {@link Refinement}, `partition` creates two new {@link AsyncStream}s
 * where the `right` contains the original {@link Stream} for which the
 * iterating function is `true`, `left` contains the elements for which it
 * is `false`.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {AsyncPredicate<A, B>} predicate The predicate function.
 * @return {<B extends A>(fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<B>>} A
 * function that takes an async stream to separate it based on a given condition
 * function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partition<A>(predicate: AsyncPredicate<A>): <B extends A>(fb: AsyncStream<B>) => Separated<AsyncStream<B>, AsyncStream<B>>

/**
 * Given an iterating function that is a {@link Predicate} or
 * a {@link Refinement}, `partition` creates two new {@link AsyncStream}s
 * where the `right` contains the original {@link Stream} for which the
 * iterating function is `true`, `left` contains the elements for which it
 * is `false`.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<A>>} A
 * function that takes an async stream to separate it based on a given condition
 * function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partition<A>(predicate: AsyncPredicate<A>): (fb: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<A>>
export function partition<A>(predicate: AsyncPredicate<A>): (fb: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<A>> {
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
 *   fa: AsyncStream<A>
 * ) => Separated<AsyncStream<A>, AsyncStream<B>>} A function that takes an
 * async stream to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionWithIndex<A, B extends A>(
  refinementWithIndex: RefinementWithIndex<number, A, B>
): (fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<B>>

/**
 * Same as [`partition`](#partition), but passing also the index to the
 * iterating function.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {AsyncPredicateWithIndex<number, A, B>} predicateWithIndex The predicate
 * function.
 * @return {<B extends A>(
 *   fa: AsyncStream<B>
 * ) => Separated<AsyncStream<B>, AsyncStream<B>>} A function that takes an
 * async stream to separate it based on a given condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionWithIndex<A>(predicateWithIndex: AsyncPredicateWithIndex<number, A>): <B extends A>(fb: AsyncStream<B>) => Separated<AsyncStream<B>, AsyncStream<B>>

/**
 * Same as [`partition`](#partition), but passing also the index to the
 * iterating function.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicateWithIndex<number, A>} predicateWithIndex The predicate
 * function.
 * @return {(fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<A>>} A
 * function that takes an async stream to separate it based on a given
 * condition function.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionWithIndex<A>(predicateWithIndex: AsyncPredicateWithIndex<number, A>): (fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<A>>
export function partitionWithIndex<A>(predicateWithIndex: AsyncPredicateWithIndex<number, A>): (fa: AsyncStream<A>) => Separated<AsyncStream<A>, AsyncStream<A>> {
  /**
   * Partitions an {@link AsyncStream} based on the previously given function.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {Separated<AsyncStream<A>, AsyncStream<A>>} The separated async streams.
   */
  return function _partitionWithIndex(fa) {
    return pipe(
      fa,
      mapWithIndex(async (i, it) => {
        if (await predicateWithIndex(i, it)) {
          return right(it)
        }
        else {
          return left(it)
        }
      }),
      separate
    )
  }
}

/**
 * Given an iterating function that returns an {@link Either},
 * `partitionMap` applies the iterating function to each element and it creates
 * two {@link AsyncStream}s where the `right` contains the values of `Right`
 * results and the `left` contains the values of `Left` results.
 *
 * @export
 * @template A The value type.
 * @template B The left type.
 * @template C The right type.
 * @param {(a: A) => Either<B, C>} f The iterating function.
 * @return {(fa: AsyncStream<A>) => Separated<AsyncStream<B>, AsyncStream<C>>} A
 * function that takes an async stream and returns a separate async streams.
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
 * @return {(fa: AsyncStream<A>) => Separated<AsyncStream<B>, AsyncStream<C>>} A
 * function that takes an async stream and returns a separate async streams.
 * 
 * @category filtering
 * @__PURE__
 */
export function partitionMapWithIndex<A, B, C>(f: (i: number, a: A) => Either<B, C>) {
  /**
   * Takes an {@link AsyncStream} to do partition based on the previously given
   * function.
   *
   * @param {AsyncStream<A>} fa The input stream.
   * @return {Separated<AsyncStream<B>, AsyncStream<C>>} The separate output
   * async streams.
   * 
   * @category filtering
   * @__PURE__
   */
  return function _partitionMapWithIndex(fa: AsyncStream<A>): Separated<AsyncStream<B>, AsyncStream<C>> {
    return pipe(
      fa,
      mapWithIndex(f),
      separate
    )
  }
}

/**
 * The `Filterable` category instance for {@link AsyncStream}.
 */
export const Filterable: Filterable1<URI> = {
  URI,
  compact: Compactable.compact,
  separate: Compactable.separate,
  map: Functor.map,

  filter<A>(fa: AsyncStream<A>, p: Predicate<A>) { return filter(p)(fa) },
  filterMap(fa, f) { return filterMap(f)(fa) },
  partition<A>(fa: AsyncStream<A>, p: Predicate<A>) { return partition(p)(fa) },
  partitionMap(fa, f) { return partitionMap(f)(fa) },
}

/**
 * The `FilterableWithIndex` category instance for {@link AsyncStream}.
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, number> = {
  URI,
  compact: Filterable.compact,
  filter: Filterable.filter,
  filterMap: Filterable.filterMap,
  filterMapWithIndex(fa, f) { return filterMapWithIndex(f)(fa) },
  filterWithIndex<A>(fa: AsyncStream<A>, predicateWithIndex: PredicateWithIndex<number, A>) {
    return filterWithIndex(predicateWithIndex)(fa)
  },
  map: Functor.map,
  mapWithIndex: FunctorWithIndex.mapWithIndex,
  partition: Filterable.partition,
  partitionMap: Filterable.partitionMap,
  partitionMapWithIndex(fa, f) {
    return partitionMapWithIndex(f)(fa)
  },
  partitionWithIndex<A>(fa: AsyncStream<A>, predicateWithIndex: PredicateWithIndex<number, A>) {
    return partitionWithIndex(predicateWithIndex)(fa)
  },
  separate: Compactable.separate,
}
