import { Either, isLeft } from 'fp-ts/lib/Either'
import {
  FromEither1,
  fromEitherK as fromEitherFromEitherK,
} from 'fp-ts/lib/FromEither'

import { of } from '../pointed'
import { AsyncStream, URI } from '../uri'
import { empty } from '../zero'

/**
 * Creates an {@link AsyncStream} from an {@link Either} instance.
 *
 * @export
 * @template E The left value type.
 * @template A The right value type.
 * @param {Either<E, A>} fa The either instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromEither<E, A>(fa: Either<E, A>): AsyncStream<A> {
  if (isLeft(fa)) {
    return empty
  }
  else {
    return of(fa.right)
  }
}

/**
 * The `FromEither` category instance for {@link AsyncStream}.
 */
export const FromEither: FromEither1<URI> = {
  URI,
  fromEither,
}

/**
 * @category lifting
 */
export const fromEitherK = fromEitherFromEitherK(FromEither)
