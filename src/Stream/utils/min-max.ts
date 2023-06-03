import { none, Option, some } from 'fp-ts/Option'

import type { Ord } from 'fp-ts/Ord'

import type { Stream } from "../uri";

/**
 * Gets the minimum value from a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Ord<A>} ord The {@link Ord} instance of the values.
 * @return {(xs: Stream<A>) => Option<A>} A function that takes a stream to
 * extract the minimum value.
 *
 * @__PURE__
 */
export function minimum<A>(ord: Ord<A>) {
  /**
   * Gets the minimum value from a {@link Stream}.
   *
   * @step 1
   * @template A The value type.
   * @param {Stream<A>} xs The stream instance to find its minimum value.
   * @return {Option<A>} The minimum value found in the stream.
   *
   * @__PURE__
   */
  return function _minimum(xs: Stream<A>): Option<A> {
    let gen = xs()

    let { value: lhs, done } = gen.next()
    if (done) return none

    for (const rhs of gen) {
      if (ord.compare(lhs, rhs) === 1) {
        lhs = rhs
      }
    }

    return some(lhs)
  }
}

/**
 * Gets the maximum value from a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {Ord<A>} ord The {@link Ord} instance of the values.
 * @return {(xs: Stream<A>) => Option<A>} A function that takes a stream to
 * extract the maximum value.
 *
 * @__PURE__
 */
export function maximum<A>(ord: Ord<A>) {
  /**
   * Gets the maximum value from a {@link Stream}.
   *
   * @step 1
   * @template A The value type.
   * @param {Stream<A>} xs The stream instance to find its maximum value.
   * @return {Option<A>} The maximum value found in the stream.
   *
   * @__PURE__
   */
  return function _maximum(xs: Stream<A>): Option<A> {
    let gen = xs()

    let { value: lhs, done } = gen.next()
    if (done) return none

    for (const rhs of gen) {
      if (ord.compare(lhs, rhs) === -1) {
        lhs = rhs
      }
    }

    return some(lhs)
  }
}
