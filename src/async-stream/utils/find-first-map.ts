import { flow } from 'fp-ts/lib/function'
import { flatten, isSome, Option } from 'fp-ts/lib/Option'
import { map as mapTask, Task } from 'fp-ts/lib/Task'

import { map } from '../functor'
import { AsyncStream } from '../uri'
import { findFirst } from './find-first'

/**
 * Given a selector function which takes an element and returns
 * a {@link Task} of an {@link Option}, this function applies the selector to
 * each element of the array and returns the first `Some` result.
 * Otherwise it returns `None`.
 *
 * @export
 * @template A The value type.
 * @template B The mapped value type.
 * @param {(a: A) => Option<B>} f The mapping function.
 * @return {(fa: AsyncStream<A>) => Task<Option<B>>} A function that takes an
 * async stream and returns an option of `B`.
 * 
 * @__PURE__
 */
export function findFirstMap<A, B>(f: (a: A) => Option<B>): (fa: AsyncStream<A>) => Task<Option<B>> {
  return flow(map(f), findFirst(isSome), mapTask(flatten))
}
