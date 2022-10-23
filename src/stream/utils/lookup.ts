import { pipe } from 'fp-ts/lib/function'
import { none, Option } from 'fp-ts/lib/Option'

import { Stream } from '../uri'
import { dropLeft } from './drop-left'
import { head } from './head'
import { take } from './take-left'

/**
 * Provides a safe way to read a value at a particular index from
 * a {@link Stream}.
 * 
 * If the index is negative, `None` will be returned.
 *
 * @export
 * @param {number} i The index to lookup.
 * @return {<A>(fa: Stream<A>) => Option<A>} A function that takes a
 * stream to lookup at given index.
 * 
 * @__PURE__
 */
export function lookup(i: number): <A>(fa: Stream<A>) => Option<A>

/**
 * Provides a safe way to read a value at a particular index from
 * a {@link Stream}.
 * 
 * If the index is negative, `None` will be returned.
 *
 * @export
 * @param {number} i The index to lookup.
 * @param {Stream<A>} fa The input stream
 * @return {(Option<A>} An option of the element at index.
 * 
 * @__PURE__
 */
export function lookup<A>(i: number, fa: Stream<A>): Option<A>
export function lookup<A>(i: number, fa?: Stream<A>) {
  if (typeof fa === 'undefined') {
    return function _lookup(ma: Stream<A>): Option<A> {
      return lookup(i, ma)
    }
  }
  else if (i < 0) { return none }
  else {
    return pipe(
      fa,
      dropLeft(i),
      take(1),
      head
    )
  }
}
