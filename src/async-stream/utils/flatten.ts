import { AsyncStream } from '../uri'

/**
 * Flattens an {@link AsyncStream} of {@link AsyncStream}s into
 * one.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<AsyncStream<A>>} mma The input async streams.
 * @return {AsyncStream<A>} The output async stream.
 * 
 * @category sequencing
 * @__PURE__
 */
export function flatten<A>(mma: AsyncStream<AsyncStream<A>>): AsyncStream<A> {
  return async function* _flatten() {
    for await (const ma of mma()) {
      yield* ma()
    }
  }
}
