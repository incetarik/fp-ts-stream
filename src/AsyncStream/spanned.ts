import { pipe } from 'fp-ts/lib/function'
import { Refinement } from 'fp-ts/lib/Refinement'
import { Task } from 'fp-ts/lib/Task'

import { fromIterable } from './conversions'
import { AsyncStream } from './uri'
import { AsyncPredicate } from './utils/async-predicate'
import { reverse } from './utils/reverse'

/**
 * Defines an interface where the `init` and the `rest` part of
 * the {@link AsyncStream} based on a condition.
 *
 * @export
 * @interface Spanned
 * @template I The init part of the {@link AsyncStream}.
 * @template R The rest of the {@link AsyncStream}.
 */
export interface Spanned<I, R> {
  /**
   * The init part of the {@link AsyncStream} where the condition was met.
   *
   * @type {AsyncStream<I>}
   * @memberof Spanned
   */
  readonly init: AsyncStream<I>

  /**
   * The rest of the {@link AsyncStream}.
   *
   * @type {AsyncStream<R>}
   * @memberof Spanned
   */
  readonly rest: AsyncStream<R>
}

/**
 * Spans an {@link AsyncStream} from the left side of it based on a refinement.
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => Task<Spanned<B, A>>} A function that takes
 * an {@link AsyncStream} and returns a {@link Task} of a {@link Spanned}
 * instance of it.
 * 
 * @__PURE__
 */
export function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (fa: AsyncStream<A>) => Task<Spanned<B, A>>

/**
 * Spans an {@link AsyncStream} from the left side of it, based on a predicate.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {<B extends A>(fb: AsyncStream<B>) => Task<Spanned<B, B>>} A function
 * that takes an {@link AsyncStream} and returns a {@link Task} of a
 * {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanLeft<A>(predicate: AsyncPredicate<A>): <B extends A>(fb: AsyncStream<B>) => Task<Spanned<B, B>>

/**
 * Spans a {@link AsyncStream} from the left side of it, based on a predicate.
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => Task<Spanned<A, A>>} A function that takes
 * an {@link AsyncStream} and returns a {@link Task} of a {@link Spanned}
 * instance of it.
 * 
 * @__PURE__
 */
export function spanLeft<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<Spanned<A, A>>
export function spanLeft<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<Spanned<A, A>> {
  return function _spanLeft(fa): Task<Spanned<A, A>> {
    return async function __spanLeft() {
      const gen = fa()
      const matches: A[] = []

      while (true) {
        const curr = await gen.next()

        if (curr.done) {
          return {
            init: fromIterable(matches),
            rest: () => gen,
          }
        }

        if (await predicate(curr.value)) {
          matches.push(curr.value)
          continue
        }
        else {
          return {
            init: fromIterable(matches),
            async *rest() {
              yield curr.value
              yield* gen
            }
          }
        }
      }
    }
  }
}

/**
 * Spans a {@link AsyncStream} from the right side of it based on a refinement.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @template B The refined value type.
 * @param {Refinement<A, B>} refinement The refinement function.
 * @return {(fa: AsyncStream<A>) => Task<Spanned<B, A>>} A function that takes
 * an {@link AsyncStream} and returns a {@link Task} of a {@link Spanned}
 * instance of it.
 * 
 * @__PURE__
 */
export function spanRight<A, B extends A>(refinement: Refinement<A, B>): (fa: AsyncStream<A>) => Task<Spanned<B, A>>

/**
 * Spans a {@link AsyncStream} from the right side of it, based on a predicate.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {<B extends A>(fb: Stream<B>) => Spanned<B, B>} A function
 * that takes an {@link AsyncStream} and returns a {@link Task} of a
 * {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanRight<A>(predicate: AsyncPredicate<A>): <B extends A>(fb: AsyncStream<B>) => Task<Spanned<B, B>>

/**
 * Spans an {@link AsyncStream} from the right side of it, based on a predicate.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {AsyncPredicate<A>} predicate The predicate function.
 * @return {(fa: AsyncStream<A>) => Task<Spanned<A, A>>} A function that takes
 * an {@link AsyncStream} and returns a {@link Spanned} instance of it.
 * 
 * @__PURE__
 */
export function spanRight<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<Spanned<A, A>>
export function spanRight<A>(predicate: AsyncPredicate<A>): (fa: AsyncStream<A>) => Task<Spanned<A, A>> {
  return function _spanRight(ma) {
    return pipe(
      ma,
      reverse,
      spanLeft(predicate)
    )
  }
}
