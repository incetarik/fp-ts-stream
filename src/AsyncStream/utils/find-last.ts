import { flow } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'
import { Refinement } from 'fp-ts/lib/Refinement'
import { Task } from 'fp-ts/lib/Task'

import { filter } from '../filterable'
import { AsyncStream } from '../uri'
import { AsyncPredicate } from './async-predicate'
import { last } from './last'

/**
 * Find the last element which satisfies a predicate (or a refinement)
 * function.
 * 
 * It returns a {@link Task} of an {@link Option} containing the element
 * or `None` if not found.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => Task<Option<B>>} A function that takes an
 * async stream to search.
 * 
 * @__PURE__
 */
export function findLast<A, B extends A>(refinement: Refinement<A, B>): (fa: AsyncStream<A>) => Task<Option<B>>

/**
 * Find the last element which satisfies a predicate (or a refinement)
 * function.
 * 
 * It returns a {@link Task} of an {@link Option} containing the element or
 * `None` if not found.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {<B extends A>(fa: AsyncStream<A>) => Task<Option<B>>} A function
 * that takes an async stream to search.
 * 
 * @__PURE__
 */
export function findLast<A>(predicate: AsyncPredicate<A>): <B extends A>(fa: AsyncStream<B>) => Task<Option<B>>

/**
 * Find the last element which satisfies a predicate (or a refinement)
 * function.
 * 
 * It returns a {@link Task} of an {@link Option} containing the element
 * or `None` if not found.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => Task<Option<A>>} A function that takes
 * an async stream to search.
 * 
 * @__PURE__
 */
export function findLast<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<Option<A>>
export function findLast<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<Option<A>> {
  return flow(filter(predicate), last)
}
