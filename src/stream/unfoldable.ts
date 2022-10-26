import { isSome, Option } from 'fp-ts/lib/Option'
import { Unfoldable1 } from 'fp-ts/lib/Unfoldable'

import { Stream, URI } from './uri'

/**
 * Takes a function which returns an {@link Option} of a tuple containing an
 * outcome value and an input for the following iteration.
 * 
 * This function applies given `f` to the inital value `b` and then recursively
 * to the second element of the tuple contained in the returned {@link Option}
 * of the previous calculation until `f` returns `None`.
 *
 * @export
 * @template A The value type.
 * @template B The initial _seed_ value type.
 * @param {B} b The initial value.
 * @param {(b: B) => Option<readonly [ A, B ]>} f A function that recursively
 * provides value-seed tuple for the output stream.
 * 
 * @returns {Stream<A>} The output stream.
 * @__PURE__
 */
export function unfold<A, B>(b: B, f: (b: B) => Option<readonly [ A, B ]>): Stream<A> {
  return function* _unfold() {
    for (let current = f(b); isSome(current); current = f(current.value[ 1 ])) {
      yield current.value[ 0 ]
    }
  }
}

/**
 * The `Unfoldable` category instance for {@link Stream}.
 */
export const Unfoldable: Unfoldable1<URI> = {
  URI,
  unfold,
}
