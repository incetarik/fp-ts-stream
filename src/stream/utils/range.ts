import { Stream } from '../uri'

/**
 * Creates a range between an interval.
 * 
 * *Note:* If `end` is not given, the range will be streaming the numbers
 * infinitely.
 *
 * @export
 * @param {number} start The start of the range.
 * @param {number} [end] The end of the range.
 * @return {Stream<number>} A {@link Stream} of numbers in the interval.
 * 
 * @__PURE__
 */
export function range(start: number, end: number = Infinity): Stream<number> {
  return function* __range() {
    while (start < end) yield start++
  }
}
