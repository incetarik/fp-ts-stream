import { getApplySemigroup } from 'fp-ts/lib/Apply'
import { Eq } from 'fp-ts/lib/Eq'
import { Semigroup } from 'fp-ts/lib/Semigroup'

import { Applicative } from '../applicative'
import { concat } from '../concat'
import { Stream } from '../uri'
import { intersection } from '../utils/intersection'
import { union } from '../utils/union'

/**
 * Gets an {@link Applicative} instance of given semigroup.
 *
 * @export
 * @template A The value type.
 * @param {Semigroup<A>} S The semigroup instance.
 * @return {Semigroup<Stream<A>>} A semigroup instance for a {@link Stream}.
 * 
 * @category instances
 * @__PURE__
 */
export function getSemigroup<A>(S: Semigroup<A>): Semigroup<Stream<A>>

/**
 * Gets a {@link Semigroup} that concats two {@link Stream}s.
 *
 * @export
 * @template A The value type.
 * @return {Semigroup<Stream<A>>} A {@link Semigroup} instance
 * for {@link Stream}s of type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getSemigroup<A = never>(): Semigroup<Stream<A>>
export function getSemigroup<A>(S?: Semigroup<A>) {
  if (typeof S === 'object' && typeof S[ 'concat' ] === 'function') {
    return getApplySemigroup(Applicative)(S)
  }
  else {
    return { concat: (x, y) => concat(y)(x) } as Semigroup<Stream<A>>
  }
}

/**
 * Gets an union {@link Semigroup} instance for `A`.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The {@link Eq} instance.
 * @return {Semigroup<Stream<A>>} An union semigroup instance for
 * {@link Stream} of type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getUnionSemigroup<A>(E: Eq<A>): Semigroup<Stream<A>> {
  const unionE = union(E)
  return {
    concat(first, second) {
      return unionE(second, first)
    }
  }
}

/**
 * Gets an intersection {@link Semigroup} instance for `A`.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The {@link Eq} instance.
 * @return {Semigroup<Stream<A>>} An intersection semigroup instance for
 * {@link Stream} of type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<Stream<A>> {
  const intresectionE = intersection(E)
  return {
    concat(first, second) {
      return intresectionE(second, first)
    },
  }
}
