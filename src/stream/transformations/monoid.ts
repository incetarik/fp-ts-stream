import { Eq } from 'fp-ts/lib/Eq'
import { Monoid } from 'fp-ts/lib/Monoid'

import { concat } from '../concat'
import { Stream } from '../uri'
import { empty } from '../zero'
import { getUnionSemigroup } from './semigroup'

/**
 * Returns a {@link Monoid} for {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @return {Monoid<Stream<A>>} A {@link Monoid} instance for {@link Stream}
 * of type `A`.
 * 
 * @example
 * import { getMonoid, fromIterable, toArray } from 'fp-ts-stream/Stream'
 * const M = getMonoid<number>()
 * 
 * assert.deepStrictEqual(
 *   toArray(M.concat(fromIterable([1, 2]), fromIterable([3, 4]))),
 *   [1, 2, 3, 4]
 * )
 * 
 * @category instances
 * @__PURE__
 */
export function getMonoid<A = never>(): Monoid<Stream<A>> {
  return {
    empty,
    concat: (x, y) => concat(y)(x)
  }
}

/**
 * Returns a {@link Monoid} for {@link Stream} which contains the union
 * of the elements.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The {@link Eq} instance for type `A`.
 * @return {Monoid<Stream<A>>} A {@link Monoid} instance for {@link Stream}
 * of type `A`.
 * 
 * @example
 * import { getMonoid, fromIterable, toArray } from 'fp-ts-stream/Stream'
 * const M = getMonoid<number>()
 * 
 * assert.deepStrictEqual(
 *   toArray(M.concat(fromIterable([1, 2]), fromIterable([2, 3, 4]))),
 *   [1, 2, 3, 4]
 * )
 * 
 * @category instances
 * @__PURE__
 */
export function getUnionMonoid<A>(E: Eq<A>): Monoid<Stream<A>> {
  return {
    empty,
    concat: getUnionSemigroup(E).concat,
  }
}
