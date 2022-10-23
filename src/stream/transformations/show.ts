import { Show } from 'fp-ts/lib/Show'

import { Stream } from '../uri'

/**
 * Gets a {@link Show} instance for {@link Stream} of type `A`.
 *
 * @export
 * @template A The value type.
 * @param {Show<A>} S The {@link Show} instance for type `A`.
 * @return {Show<Stream<A>>} The {@link Show} instance for {@link Stream}
 * of type `A`.
 * 
 * @category instances
 * @__PURE__
 */
export function getShow<A>(S: Show<A>): Show<Stream<A>> {
  return {
    show(ma) {
      let str = '{';
      const m = ma()
      let step = m.next()

      if (step.done) {
        return str + '}'
      }
      else {
        str += ` ${S.show(step.value)}`
      }

      step = m.next()

      while (!step.done) {
        str += `, ${S.show(step.value)}`
        step = m.next()
      }

      return str + ' }'
    },
  }
}
