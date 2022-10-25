import { FromIO1 } from 'fp-ts/lib/FromIO'
import { IO } from 'fp-ts/lib/IO'

import { AsyncStream, URI } from '../uri'

/**
 * Creates an {@link AsyncStream} from an {@link IO} instance.
 *
 * @export
 * @template A The value type.
 * @param {IO<A>} fa The io instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromIO<A>(fa: IO<A>): AsyncStream<A> {
  return async function* _fromIO() {
    yield fa()
  }
}

/**
 * The `FromIO` category instance for {@link AsyncStream}.
 */
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
}
