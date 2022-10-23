import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { of } from '../pointed'
import { Stream } from '../uri'
import { empty } from '../zero'

/**
 * Creates a {@link Stream} from a {@link Refinement}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(a: A) => Stream<B>} A function that will take a value
 * and return a stream of it.
 * 
 * @__PURE__
 */
export function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Stream<B>

/**
 * Creates a {@link Stream} from a {@link Predicate}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Predicate<A>} predicate The refinement function.
 * @return {<B extends A>(b: B) => Stream<B>} A function that will take a value
 * and return a stream of it.
 * 
 * @__PURE__
 */
export function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => Stream<B>

/**
 * Creates a {@link Stream} from a {@link Predicate}.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Predicate<A>} predicate The refinement function.
 * @return {(a: A) => Stream<A>} A function that will take a value
 * and return a stream of it.
 * 
 * @__PURE__
 */
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Stream<A>
export function fromPredicate<A>(predicate: Predicate<A>) {
  /**
   * Takes a value to apply the previously given predicate to create a
   * {@link Stream} instance.
   *
   * @param {A} a The input value.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _fromPredicate(a: A): Stream<A> {
    if (predicate(a)) return of(a)
    else {
      return empty
    }
  }
}
