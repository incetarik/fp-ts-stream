import { Either, isLeft } from 'fp-ts/lib/Either'

import { AsyncStream } from '../uri'

/**
 * Extracts from an {@link AsyncStream} all the `Left` elements.
 * 
 * All the `Left` elements are extracted in order.
 *
 * @export
 * @template E The error type.
 * @template A The value type.
 * @param {AsyncStream<Either<E, A>>} fa The input async stream.
 * @return {AsyncStream<E>} The output async stream.
 * 
 * @__PURE__
 */
export function lefts<E, A>(fa: AsyncStream<Either<E, A>>): AsyncStream<E> {
  return async function* _lefts() {
    for await (const e of fa()) {
      if (isLeft(e)) {
        yield e.left
      }
    }
  }
}
