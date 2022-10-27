import { isSome, Option } from 'fp-ts/lib/Option'

import { of } from '../pointed'
import { Stream } from '../uri'
import { empty } from '../zero'

/**
 * Returns a new {@link Stream} from an {@link Option}.
 *
 * @export
 * @template A The value type.
 * @param {Option<A>} fa The option input.
 * @return {Stream<A>} The stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromOption<A>(fa: Option<A>): Stream<A> {
  if (isSome(fa)) {
    return of(fa.value)
  }
  else {
    return empty
  }
}
