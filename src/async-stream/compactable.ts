import { Compactable1 } from 'fp-ts/lib/Compactable'
import { Either, isLeft, isRight } from 'fp-ts/lib/Either'
import { isSome, Option } from 'fp-ts/lib/Option'
import { Separated } from 'fp-ts/lib/Separated'

import { AsyncStream, URI } from './uri'

/**
 * Compact a {@link AsyncStream} of {@link Option}s discarding the `None` values
 * and keeping the `Some` values. It returns a new {@link AsyncStream}
 * containing the values of `Some` options.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<Option<A>>} fa The input async stream.
 * @return {AsyncStream<A>} The output async stream.
 * 
 * @category filtering
 * @__PURE__
 */
export function compact<A>(fa: AsyncStream<Option<A>>): AsyncStream<A> {
  return async function* __compact() {
    for await (const a of fa()) {
      if (isSome(a)) {
        yield a.value
      }
    }
  }
}

/**
 * Separate a {@link AsyncStream} of {@link Either}s into `Left` and `Right`s,
 * creating two new {@link AsyncStream}s where one containing all the left
 * values and the other containing all the right values.
 *
 * @export
 * @template E The left value type.
 * @template A The right value type.
 * @param {AsyncStream<Either<E, A>>} fa The input async stream.
 * @return {Separated<AsyncStream<E>, AsyncStream<A>>} The separated output
 * async streams.
 * 
 * @category filtering
 * @__PURE__
 */
export function separate<E, A>(fa: AsyncStream<Either<E, A>>): Separated<AsyncStream<E>, AsyncStream<A>> {
  return {
    async *left() {
      for await (const a of fa()) {
        if (isLeft(a)) {
          yield a.left
        }
      }
    },
    async *right() {
      for await (const a of fa()) {
        if (isRight(a)) {
          yield a.right
        }
      }
    }
  }
}

/**
 * The `Compactable` category instance for {@link AsyncStream}.
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate,
}
