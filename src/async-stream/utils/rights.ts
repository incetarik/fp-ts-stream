import { Either, isRight } from 'fp-ts/lib/Either'

import { AsyncStream } from '../uri'

/**
 * Extracts from an {@link AsyncStream} all the `Right` elements.
 * 
 * All the `Right` elements are extracted in order.
 *
 * @export
 * @template E The error type.
 * @template A The value type.
 * @param {AsyncStream<Either<E, A>>} fa The input async stream.
 * @return {AsyncStream<A>} The output async stream.
 * 
 * @__PURE__
 */
export function rights<E, A>(fa: AsyncStream<Either<E, A>>): AsyncStream<A> {
  return async function* _rights() {
    for await (const e of fa()) {
      if (isRight(e)) {
        yield e.right
      }
    }
  }
}
