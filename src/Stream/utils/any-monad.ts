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
  Monad,
  Monad1,
  Monad2,
  Monad2C,
  Monad3,
  Monad3C,
  Monad4,
} from 'fp-ts/lib/Monad'
import type { Stream } from '../uri'

import { pipe } from 'fp-ts/lib/function'

import { reduce } from '../foldable'

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The context.
 * @param {Monad4<M>} M The monadic context.
 * @return {<S, R, E>(input: Stream<Kind4<F, S, R, E, boolean>>) => Kind4<F, S, R, E, boolean>} The input source.
 *
 * @__PURE__
 */
export function anyM<F extends URIS4>(M: Monad4<F>): <S, R, E>(input: Stream<Kind4<F, S, R, E, boolean>>) => Kind4<F, S, R, E, boolean>

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The context type.
 * @param {Monad3<M>} M The monadic context.
 * @return {<R, E>(input: Stream<Kind3<F, R, E, boolean>>) => Kind3<F, R, E, boolean>} The input source.
 *
 * @__PURE__
 */
export function anyM<F extends URIS3>(M: Monad3<F>): <R, E>(input: Stream<Kind3<F, R, E, boolean>>) => Kind3<F, R, E, boolean>

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The monadic context.
 * @template E The constrained type.
 * @param {Monad3C<M, E>} M The monadic context.
 * @return {<R>(input: Stream<Kind3<F, R, E, boolean>>) => Kind3<F, R, E, boolean>} The input source.
 *
 *  @__PURE__
 */
export function anyM<F extends URIS3, E>(M: Monad3C<F, E>): <R>(input: Stream<Kind3<F, R, E, boolean>>) => Kind3<F, R, E, boolean>

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The context type.
 * @param {Monad2<M>} M The monadic context.
 * @return {<E>(input: Stream<Kind2<F, E, boolean>>) => Kind2<F, E, boolean>} The input source.
 *
 * @__PURE__
 */
export function anyM<F extends URIS2>(M: Monad2<F>): <E>(input: Stream<Kind2<F, E, boolean>>) => Kind2<F, E, boolean>

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The monadic context.
 * @template E The constrained type.
 * @param {Monad2C<M, E>} M The monadic context.
 * @return {(input: Stream<Kind2<F, E, boolean>>) => Kind2<F, E, boolean>} The input source.
 *
 * @__PURE__
 */
export function anyM<F extends URIS2, E>(M: Monad2C<F, E>): (input: Stream<Kind2<F, E, boolean>>) => Kind2<F, E, boolean>

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The context type.
 * @param {Monad1<M>} M The monadic context.
 * @return {<A>(input: Stream<Kind<F, boolean>>) => Kind<F, boolean>} The input source.
 *
 * @__PURE__
 */
export function anyM<F extends URIS>(M: Monad1<F>): (input: Stream<Kind<F, boolean>>) => Kind<F, boolean>

/**
 * Fold a {@link Stream} of monadic booleans from left-to-right in terms of `||`.
 *
 * Short-circuits.
 *
 * @export
 * @template M The context type.
 * @param {Monad4<M>} M The monadic context.
 * @return {(input: Stream<boolean>) => HKT<F, boolean>} The input source.
 * @__PURE__
 */
export function anyM<F>(M: Monad<F>) {
  /**
   * Takes a stream to fold in the previously given monadic context from left-to-right
   * in terms of `||`.
   *
   * Short-circuits.
   *
   * @step 1
   * @template A The type of the value.
   * @param {(input: Stream<boolean>) => HKT<F, boolean>} input The input stream.
   *
   * @__PURE__
   */
  return function _anyM(input: Stream<HKT<F, boolean>>): HKT<F, boolean> {
    return pipe(
      input,
      reduce(M.of(false), (x, y) => M.chain(x, b => (b ? M.of(true) : y)))
    )
  }
}
