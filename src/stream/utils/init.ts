import { none, Option, some } from 'fp-ts/lib/Option'

import { Stream } from '../uri'

/**
 * Gets all but the last element of a {@link Stream}, creating a new
 * {@link Stream}, or `None` if the stream was empty.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The input stream.
 * @return {Option<Stream<A>>} An option of output stream.
 * 
 * @__PURE__
 */
export function init<A>(fa: Stream<A>): Option<Stream<A>> {
  const gen = fa()
  const { done, value } = gen.next()

  if (done) return none
  return some(function* _init() {
    let curr = gen.next()
    if (curr.done) return

    yield value

    let last = curr.value
    while (!curr.done) {
      curr = gen.next()
      if (curr.done) return

      yield last
      last = curr.value
    }
  })
}
