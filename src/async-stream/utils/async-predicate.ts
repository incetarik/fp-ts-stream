/**
 * An interface that represents a function that returns a task of a boolean.
 *
 * @export
 * @interface AsyncPredicate
 * @template A The value type.
 */
export interface AsyncPredicate<A> {
  (a: A): Promise<boolean> | boolean
}
