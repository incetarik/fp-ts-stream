import { AsyncStream } from '../uri'

/**
 * Creates an {@link AsyncStream} from a {@link ReadableStream} instance.
 *
 * @export
 * @template A The value type.
 * @param {ReadableStream<A>} fa The readable stream instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromReadableStream<A>(fa: ReadableStream<A>): AsyncStream<A> {
  return async function* _fromReadableStream() {
    const reader = fa.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        if (typeof value !== 'undefined') {
          yield value
        }

        return
      }

      if (typeof value !== 'undefined') {
        yield value
      }
      else {
        return
      }
    }
  }
}
