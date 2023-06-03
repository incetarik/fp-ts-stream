import { Task } from 'fp-ts/lib/Task'

import { MaybeAsync } from './maybe-async'

import type { AsyncStream } from '../uri'
/**
 * Map each item of a {@link AsyncStream} to a key and count how mony map to
 * each key.
 *
 * @export
 * @template A The type of the item.
 * @param {(x: A) => MaybeAsync<string>} f The key from value function.
 * @return {(input: AsyncStream<A>) => Record<string, number>} A function that will
 * take a {@link AsyncStream} and returns the counts of its mapped values.
 *
 * @__PURE__
 */
export function countBy<A>(f: (x: A) => MaybeAsync<string>) {
  /**
   * Map each item of a {@link AsyncStream} to a key and count how mony map to
   * each key.
   *
   * @step 1
   * @template A The type of the item.
   * @param {AsyncStream<A>} input The input stream to count its values.
   * @return {Record<string, number>} A record containing the mapped values
   * of the stream and their values.
   *
   * @__PURE__
   */
  return function _countBy(input: AsyncStream<A>): Task<Record<string, number>> {
    return async function __countBy() {
      let rec: Record<string, number> = {}

      for await (const a of input()) {
        const key = await f(a)
        rec[ key ] ||= 0
        rec[ key ] += 1
      }

      return rec
    }
  }
}
