import { of } from '../pointed'
import { AsyncStream } from '../uri'
import { AsyncPredicate } from '../utils/async-predicate'
import { empty } from '../zero'

/**
 * Creates a {@link AsyncStream} from a {@link AsyncPredicate}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {AsyncPredicate<A>} predicate The refinement function.
 * @return {<B extends A>(b: B) => AsyncStream<B>} A function that will take a
 * value and return an async stream of it.
 * 
 * @__PURE__
 */
export function fromAsyncPredicate<A>(predicate: AsyncPredicate<A>): <B extends A>(b: B) => AsyncStream<B>

/**
 * Creates an {@link AsyncStream} from an {@link AsyncPredicate}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {AsyncPredicate<A>} predicate The refinement function.
 * @return {(a: A) => AsyncStream<A>} A function that will take a value
 * and return an async stream of it.
 * 
 * @__PURE__
 */
export function fromAsyncPredicate<A>(predicate: AsyncPredicate<A>): (a: A) => AsyncStream<A>
export function fromAsyncPredicate<A>(predicate: AsyncPredicate<A>) {
  /**
   * Takes a value to apply the previously given predicate to create an
   * {@link AsyncStream} instance.
   *
   * @param {A} a The input value.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _fromAsyncPredicate(a: A): AsyncStream<A> {
    return async function* __fromAsyncPredicate() {
      if (await predicate(a)) return of(a)
      else {
        return empty
      }
    }
  }
}
