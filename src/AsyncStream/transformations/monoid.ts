import { Eq } from 'fp-ts/lib/Eq'
import { Monoid } from 'fp-ts/lib/Monoid'

import { concat } from '../concat'
import { AsyncStream } from '../uri'
import { empty } from '../zero'
import { getUnionSemigroup } from './semigroup'

/**
 * Returns a {@link Monoid} for {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @return {Monoid<AsyncStream<A>>} A {@link Monoid} instance for
 * {@link AsyncStream} of type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getMonoid<A = never>(): Monoid<AsyncStream<A>> {
  return {
    empty,
    concat: (x, y) => concat(y)(x)
  }
}

/**
 * Returns a {@link Monoid} for {@link AsyncStream} which contains the union
 * of the elements.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The {@link Eq} instance for type `A`.
 * @return {Monoid<AsyncStream<A>>} A {@link Monoid} instance for
 * {@link AsyncStream} of type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getUnionMonoid<A>(E: Eq<A>): Monoid<AsyncStream<A>> {
  return {
    empty,
    concat: getUnionSemigroup(E).concat,
  }
}
