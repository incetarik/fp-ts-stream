import { flow } from 'fp-ts/lib/function'
import { flatten, isSome, Option } from 'fp-ts/lib/Option'

import { map } from '../functor'
import { Stream } from '../uri'
import { findLast } from './find-last'

/**
 * Given a selector function which takes an element and returns
 * an {@link Option}, this function applies the selector to each element of
 * the array and returns the last `Some` result. Otherwise it returns `None`.
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
export function findLastMap<A, B>(f: (a: A) => Option<B>): (fa: Stream<A>) => Option<B> {
  return flow(map(f), findLast(isSome), flatten)
}
