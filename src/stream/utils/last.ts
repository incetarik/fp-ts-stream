import { none, Option, some } from 'fp-ts/lib/Option'

import { Stream } from '../uri'

/**
 * Gets the last element in a {@link Stream}, or `None` if the {@link Stream}
 * is empty.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} ma The input stream.
 * @return {Option<A>} An option of the last value.
 * 
 * @__PURE__
 */
export function last<A>(ma: Stream<A>): Option<A> {
  const gen = ma()
  const { done, value } = gen.next()
  if (done) return none

  let last = value
  for (const a of gen) {
    last = a
  }

  return some(last)
}
