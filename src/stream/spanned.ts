import { pipe } from 'fp-ts/lib/function'
import { Predicate } from 'fp-ts/lib/Predicate'
import { Refinement } from 'fp-ts/lib/Refinement'

import { fromIterable } from './conversions'
import { Stream } from './uri'
import { reverse } from './utils/reverse'

/**
 * Defines an interface where the `init` and the `rest` part of
 * the {@link Stream} based on a condition.
 *
 * @export
 * @interface Spanned
 * @template I The init part of the {@link Stream}.
 * @template R The rest of the {@link Stream}.
 */
export interface Spanned<I, R> {
  /**
   * The init part of the {@link Stream} where the condition was met.
   *
   * @type {Stream<I>}
   * @memberof Spanned
   */
  readonly init: Stream<I>

  /**
   * The rest of the {@link Stream}.
   *
   * @type {Stream<R>}
   * @memberof Spanned
   */
  readonly rest: Stream<R>
}

/**
 * Spans a {@link Stream} from the left side of it based on a refinement.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(ma: Stream<A>) => Spanned<B, A>} A function that takes
 * a {@link Stream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (ma: Stream<A>) => Spanned<B, A>

/**
 * Spans a {@link Stream} from the left side of it, based on a predicate.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {<B extends A>(mb: Stream<B>) => Spanned<B, B>} A function
 * that takes a {@link Stream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanLeft<A>(predicate: Predicate<A>): <B extends A>(mb: Stream<B>) => Spanned<B, B>

/**
 * Spans a {@link Stream} from the left side of it, based on a predicate.
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {*}  {(ma: Stream<A>) => Spanned<A, A>} A function that takes
 * a {@link Stream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanLeft<A>(predicate: Predicate<A>): (ma: Stream<A>) => Spanned<A, A>
export function spanLeft<A>(predicate: Predicate<A>): (ma: Stream<A>) => Spanned<A, A> {
  return function _spanLeft(ma) {
    const gen = ma()
    const matches: A[] = []

    while (true) {
      const curr = gen.next()

      if (curr.done) {
        return {
          init: fromIterable(matches),
          *rest() {
            yield* gen
          }
        }
      }

      if (predicate(curr.value)) {
        matches.push(curr.value)
        continue
      }
      else {
        return {
          init: fromIterable(matches),
          *rest() {
            yield curr.value
            yield* gen
          }
        }
      }
    }
  }
}

/**
 * Spans a {@link Stream} from the right side of it based on a refinement.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(ma: Stream<A>) => Spanned<B, A>} A function that takes
 * a {@link Stream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanRight<A, B extends A>(refinement: Refinement<A, B>): (ma: Stream<A>) => Spanned<B, A>

/**
 * Spans a {@link Stream} from the right side of it, based on a predicate.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {<B extends A>(mb: Stream<B>) => Spanned<B, B>} A function
 * that takes a {@link Stream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanRight<A>(predicate: Predicate<A>): <B extends A>(mb: Stream<B>) => Spanned<B, B>

/**
 * Spans a {@link Stream} from the right side of it, based on a predicate.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Predicate<A>} predicate The predicate function.
 * @return {*}  {(ma: Stream<A>) => Spanned<A, A>} A function that takes
 * a {@link Stream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanRight<A>(predicate: Predicate<A>): (ma: Stream<A>) => Spanned<A, A>
export function spanRight<A>(predicate: Predicate<A>): (ma: Stream<A>) => Spanned<A, A> {
  return function _spanRight(ma) {
    return pipe(
      ma,
      reverse,
      spanLeft(predicate)
    )
  }
}
