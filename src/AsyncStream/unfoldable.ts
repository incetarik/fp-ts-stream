import { isSome, Option } from 'fp-ts/lib/Option'
import { Unfoldable1 } from 'fp-ts/lib/Unfoldable'

import { AsyncStream, URI } from './uri'
import { MaybeAsync } from './utils/maybe-async'

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
 * @param {(b: B) => Option<readonly [ A, B ]> | Promise<Option<readonly [ A, B ]>>} f A
 * function that recursively provides value-seed tuple for the output async
 * stream.
 * 
 * @returns {AsyncStream<A>} The output async stream.
 * @__PURE__
 */
export function unfold<A, B>(b: B, f: (b: B) => MaybeAsync<Option<readonly [ A, B ]>>): AsyncStream<A> {
  return async function* _unfold() {
    for (
      let current = await f(b);
      isSome(current);
      current = await f(current.value[ 1 ])
    ) { yield current.value[ 0 ] }
  }
}

/**
 * The `Unfoldable` category instance for {@link AsyncStream}.
 */
export const Unfoldable: Unfoldable1<URI> = {
  URI,
  unfold,
}
