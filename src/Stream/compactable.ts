import { Compactable1 } from 'fp-ts/lib/Compactable'
import { Either, isLeft, isRight } from 'fp-ts/lib/Either'
import { isSome, Option } from 'fp-ts/lib/Option'
import { Separated } from 'fp-ts/lib/Separated'

import { Stream, URI } from './uri'

/**
 * Compact a {@link Stream} of {@link Option}s discarding the `None` values
 * and keeping the `Some` values. It returns a new {@link Stream} containing
 * the values of `Some` options.
 *
 * @export
 * @template A The value type.
 * @param {Stream<Option<A>>} fa The input stream.
 * @return {Stream<A>} The output stream.
 * 
 * @category filtering
 * @__PURE__
 */
export function compact<A>(fa: Stream<Option<A>>): Stream<A> {
  return function* __compact() {
    for (const a of fa()) {
      if (isSome(a)) {
        yield a.value
      }
    }
  }
}

/**
 * Separate a {@link Stream} of {@link Either}s into `Left` and `Right`s,
 * creating two new {@link Stream}s where one containing all the left
 * values and the other containing all the right values.
 *
 * @export
 * @template E The left value type.
 * @template A The right value type.
 * @param {Stream<Either<E, A>>} fa The input stream.
 * @return {Separated<Stream<E>, Stream<A>>} The separated output streams.
 * 
 * @category filtering
 * @__PURE__
 */
export function separate<E, A>(fa: Stream<Either<E, A>>): Separated<Stream<E>, Stream<A>> {
  return {
    *left() {
      for (const a of fa()) {
        if (isLeft(a)) {
          yield a.left
        }
      }
    },
    *right() {
      for (const a of fa()) {
        if (isRight(a)) {
          yield a.right
        }
      }
    }
  }
}

/**
 * The `Compactable` category instance for {@link Stream}.
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate,
}
