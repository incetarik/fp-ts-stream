import { TaskOption } from 'fp-ts/lib/TaskOption'
import { none, some } from 'fp-ts/Option'

import type { Ord } from 'fp-ts/Ord'

import type { AsyncStream } from "../uri";

/**
 * Gets the minimum value from a {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Ord<A>} ord The {@link Ord} instance of the values.
 * @return {(xs: AsyncStream<A>) => TaskOption<A>} A function that takes a stream to
 * extract the minimum value.
 *
 * @__PURE__
 */
export function minimum<A>(ord: Ord<A>) {
  /**
   * Gets the minimum value from a {@link AsyncStream}.
   *
   * @step 1
   * @template A The value type.
   * @param {AsyncStream<A>} xs The stream instance to find its minimum value.
   * @return {TaskOption<A>} The minimum value found in the stream.
   *
   * @__PURE__
   */
  return function _minimum(xs: AsyncStream<A>): TaskOption<A> {
    return async function __minimum() {
      let gen = xs()

      let { value: lhs, done } = await gen.next()
      if (done) return none

      for await (const rhs of gen) {
        if (ord.compare(lhs, rhs) === 1) {
          lhs = rhs
        }
      }

      return some(lhs)
    }
  }
}

/**
 * Gets the maximum value from a {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {Ord<A>} ord The {@link Ord} instance of the values.
 * @return {(xs: AsyncStream<A>) => TaskOption<A>} A function that takes a stream to
 * extract the maximum value.
 *
 * @__PURE__
 */
export function maximum<A>(ord: Ord<A>) {
  /**
   * Gets the maximum value from a {@link AsyncStream}.
   *
   * @step 1
   * @template A The value type.
   * @param {AsyncStream<A>} xs The stream instance to find its maximum value.
   * @return {TaskOption<A>} The maximum value found in the stream.
   *
   * @__PURE__
   */
  return function _maximum(xs: AsyncStream<A>): TaskOption<A> {
    return async function __maximum() {
      let gen = xs()

      let { value: lhs, done } = await gen.next()
      if (done) return none

      for await (const rhs of gen) {
        if (ord.compare(lhs, rhs) === -1) {
          lhs = rhs
        }
      }

      return some(lhs)
    }
  }
}
