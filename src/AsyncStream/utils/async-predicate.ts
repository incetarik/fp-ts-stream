import { MaybeAsync } from './maybe-async'

/**
 * An interface that represents a function that returns a task of a boolean.
 *
 * @export
 * @interface AsyncPredicate
 * @template A The value type.
 */
export interface AsyncPredicate<A> {
  (a: A): MaybeAsync<boolean>
}

/**
 * An interface that represents a function that returns a task of a boolean.
 *
 * @export
 * @interface AsyncPredicateWithIndex
 * @template A The value type.
 */
export interface AsyncPredicateWithIndex<I, A> {
  (i: I, a: A): MaybeAsync<boolean>
}
