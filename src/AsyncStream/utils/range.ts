import { AsyncStream } from '../uri'

/**
 * Creates a range between an interval.
 * 
 * *Note:* If `end` is not given, the range will be streaming the numbers
 * infinitely.
 *
 * @export
 * @param {number} start The start of the range.
 * @param {number} [end] The end of the range.
 * @return {AsyncStream<number>} A {@link AsyncStream} of numbers in the
 * interval.
 * 
 * @__PURE__
 */
export function range(start: number, end: number = Infinity): AsyncStream<number> {
  return async function* __range() {
    while (start < end) yield start++
  }
}
