import { Either, isLeft } from 'fp-ts/lib/Either'

import { Stream } from '../uri'

/**
 * Extracts from a {@link Stream} all the `Left` elements.
 * 
 * All the `Left` elements are extracted in order.
 *
 * @export
 * @template E The error type.
 * @template A The value type.
 * @param {Stream<Either<E, A>>} fa The input stream.
 * @return {Stream<E>} The output stream.
 * 
 * @__PURE__
 */
export function lefts<E, A>(fa: Stream<Either<E, A>>): Stream<E> {
  return function* _lefts() {
    for (const e of fa()) {
      if (isLeft(e)) {
        yield e.left
      }
    }
  }
}
