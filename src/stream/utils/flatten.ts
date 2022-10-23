import { Stream } from '../uri'

/**
 * Takes a {@link Stream} of {@link Stream}s of `A` and flattens them into
 * a {@link Stream} of `A` by concatenating the elements of each {@link Stream}
 * in order.
 *
 * @export
 * @template A The value type.
 * @param {Stream<Stream<A>>} mma The input streams.
 * @return {Stream<A>} The output stream.
 * 
 * @category sequencing
 * @__PURE__
 */
export function flatten<A>(mma: Stream<Stream<A>>): Stream<A> {
  return function* _flatten() {
    for (const ma of mma()) yield* ma()
  }
}
