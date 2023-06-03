import type {
  HKT,
  Kind,
  Kind2,
  Kind3,
  Kind4,
  URIS,
  URIS2,
  URIS3,
  URIS4,
} from 'fp-ts/HKT'
import type {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4,
} from 'fp-ts/lib/Applicative'
import type { Stream } from '../uri'

import { none, some } from 'fp-ts/lib/Option'

import { Witherable } from '../witherable'

/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The context.
 * @param {Applicative4<F>} F The applicative context.
 * @return {<S, R, E, A>(f: (x: A) => Kind4<F, S, R, E, boolean>) => (input: Stream<A>) => Kind4<F, S, R, E, Stream<A>>} The filter function.
 *
 * @__PURE__
 */
export function filterA<F extends URIS4>(F: Applicative4<F>): <S, R, E, A>(f: (x: A) => Kind4<F, S, R, E, boolean>) => (input: Stream<A>) => Kind4<F, S, R, E, Stream<A>>

/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The context type.
 * @param {Applicative3<F>} F The applicative context.
 * @return {<R, E, A>(f: (x: A) => Kind3<F, R, E, boolean>) => (input: Stream<A>) => Kind3<F, R, E, Stream<A>>} The filter function.
 *
 * @__PURE__
 */
export function filterA<F extends URIS3>(F: Applicative3<F>): <R, E, A>(f: (x: A) => Kind3<F, R, E, boolean>) => (input: Stream<A>) => Kind3<F, R, E, Stream<A>>

/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The applicative context.
 * @template E The constrained type.
 * @param {Applicative3C<F, E>} F The applicative context.
 * @return {<R, A>(f: (x: A) => Kind3<F, R, E, boolean>) => (input: Stream<A>) => Kind3<F, R, E, Stream<A>>} The filter function.
 *
 *  @__PURE__
 */
export function filterA<F extends URIS3, E>(F: Applicative3C<F, E>): <R, A>(f: (x: A) => Kind3<F, R, E, boolean>) => (input: Stream<A>) => Kind3<F, R, E, Stream<A>>

/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The context type.
 * @param {Applicative2<F>} F The applicative context.
 * @return {<E, A>(f: (x: A) => Kind2<F, E, boolean>) => (input: Stream<A>) => Kind2<F, E, Stream<A>>} The filter function.
 *
 * @__PURE__
 */
export function filterA<F extends URIS2>(F: Applicative2<F>): <E, A>(f: (x: A) => Kind2<F, E, boolean>) => (input: Stream<A>) => Kind2<F, E, Stream<A>>


/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The applicative context.
 * @template E The constrained type.
 * @param {Applicative2C<F, E>} F The applicative context.
 * @return {<A>(f: (x: A) => Kind2<F, E, boolean>) => (input: Stream<A>) => Kind2<F, E, Stream<A>>} The filter function.
 *
 * @__PURE__
 */
export function filterA<F extends URIS2, E>(F: Applicative2C<F, E>): <A>(f: (x: A) => Kind2<F, E, boolean>) => (input: Stream<A>) => Kind2<F, E, Stream<A>>

/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The context type.
 * @param {Applicative1<F>} F The applicative context.
 * @return {<A>(f: (x: A) => Kind<F, boolean>) => (input: Stream<A>) => Kind<F, Stream<A>>} The filter function.
 *
 * @__PURE__
 */
export function filterA<F extends URIS>(F: Applicative1<F>): <A>(f: (x: A) => Kind<F, boolean>) => (input: Stream<A>) => Kind<F, Stream<A>>

/**
 * Filter a {@link Stream} based upon a predicate whose boolean is returned in an
 * applicative context.
 *
 * @export
 * @template F The context type.
 * @param {Applicative4<F>} F The applicative context.
 * @return {<A>(f: (x: A) => HKT<F, boolean>) => (input: Stream<A>) => HKT<F, Stream<A>>} The filter function.
 * @__PURE__
 */
export function filterA<F>(F: Applicative<F>) {
  /**
   * Takes a function to filter in the previously given applicative context.
   *
   * @step 1
   * @template A The type of the value.
   * @param {(x: A) => HKT<F, boolean>} f The filtering function.
   * @return {(input: Stream<A>) => HKT<F, Stream<A>>} A function that will take the input stream to filter.
   *
   * @__PURE__
   */
  return function _filterA<A>(f: (x: A) => HKT<F, boolean>) {
    /**
     * Takes an input {@link Stream} to filter by previously given function in
     * the previously given applicative context.
     *
     * @step 2
     * @param {Stream<A>} input The input stream.
     * @return {HKT<F, Stream<A>>} The output stream whose values are filtered
     * in the given context.
     *
     * @__PURE__
     */
    return function __filterA(input: Stream<A>): HKT<F, Stream<A>> {
      return Witherable.wither(F)(input, x => F.map(f(x), it => it ? some(x) : none))
    }
  }
}
