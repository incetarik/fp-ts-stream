import { flow } from 'fp-ts/lib/function'
import { flatten, isSome, Option } from 'fp-ts/lib/Option'

import { map } from '../functor'
import { findFirst } from './find-first'

/**
 * Given a selector function which takes an element and returns
 * an {@link Option}, this function applies the selector to each element of
 * the array and returns the first `Some` result. Otherwise it returns `None`.
 *
 * @export
 * @template A The value type.
 * @template B The mapped value type.
 * @param {(a: A) => Option<B>} f The mapping function.
 * @return {(fa: Stream<A>) => Option<B>} A function that takes a stream and
 * returns an option of `B`.
 * 
 * @__PURE__
 */
export function findFirstMap<A, B>(f: (a: A) => Option<B>) {
  return flow(map(f), findFirst(isSome), flatten)
}
