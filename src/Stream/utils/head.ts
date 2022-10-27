import { none, Option, some } from 'fp-ts/lib/Option'

import { Stream } from '../uri'

/**
 * Gets the first element in a {@link Stream}, or `None` if the {@link Stream}
 * is empty.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} ma The input stream.
 * @return {Option<A>} An option of the first value in the stream.
 * 
 * @__PURE__
 */
export function head<A>(ma: Stream<A>): Option<A> {
  const gen = ma()
  const { value, done } = gen.next()

  if (done) return none
  else {
    return some(value)
  }
}
