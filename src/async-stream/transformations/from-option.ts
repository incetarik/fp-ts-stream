import { isSome, Option } from 'fp-ts/lib/Option'

import { of } from '../pointed'
import { AsyncStream } from '../uri'
import { empty } from '../zero'

/**
 * Creates an {@link AsyncStream} from an {@link Option} instance.
 *
 * @export
 * @template A The value type.
 * @param {Option<A>} fa The option instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromOption<A>(fa: Option<A>): AsyncStream<A> {
  if (isSome(fa)) {
    return of(fa.value)
  }
  else {
    return empty
  }
}
