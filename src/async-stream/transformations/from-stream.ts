import { Stream } from '../../stream/uri'
import { AsyncStream } from '../uri'

/**
 * Creates an {@link AsyncStream} from a {@link Stream} instance.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The stream instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversion
 * @__PURE__
 */
export function fromStream<A>(fa: Stream<A>): AsyncStream<A> {
  return async function* _fromStream() {
    for (const a of fa()) {
      yield a
    }
  }
}
