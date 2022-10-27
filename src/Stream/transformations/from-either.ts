import { Either, isRight } from 'fp-ts/lib/Either'
import { FromEither1, fromEitherK as fromEitherK_ } from 'fp-ts/lib/FromEither'

import { of } from '../pointed'
import { Stream, URI } from '../uri'
import { empty } from '../zero'

/**
 * Create a {@link Stream} from {@link Either}.
 * 
 * The resulting {@link Stream} will contain the content of the {@link Either}
 * if it is `Right` and it will be empty if the {@link Either} is `Left.
 *
 * @export
 * @template A The value type.
 * @param {Either<unknown, A>} fa The either input.
 * @return {Stream<A>} The output stream.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromEither<A>(fa: Either<unknown, A>): Stream<A> {
  if (isRight(fa)) {
    return of(fa.right)
  }
  else {
    return empty
  }
}

/**
 * The `FromEither` category instance for {@link Stream}.
 * 
 * @category conversions
 */
export const FromEither: FromEither1<URI> = {
  URI,
  fromEither,
}

/**
 * @category lifting
 * 
 * @__PURE__
 */
export const fromEitherK = fromEitherK_(FromEither)
