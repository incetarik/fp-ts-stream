import { none, some } from 'fp-ts/lib/Option'

import { Stream } from '../uri'

/**
 * Gets all but the first element of a {@link Stream}, creating a new
 * {@link Stream}, or `None` if the {@link Stream} is empty.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The input stream.
 * @return {Option<Stream<A>>} An option of a stream whose first element is
 * excluded.
 * 
 * @__PURE__
 */
export function tail<A>(fa: Stream<A>) {
  const gen = fa()
  const { done } = gen.next()

  if (done) return none
  return some(function* _tail() {
    yield* gen
  })
}
