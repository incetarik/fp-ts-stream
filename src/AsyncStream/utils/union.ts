import { Eq } from 'fp-ts/lib/Eq'

import { AsyncStream } from '../uri'

/**
 * Creates an {@link AsyncStream} of unique values, in order, from all given
 * {@link AsyncStream}s using a {@link Eq} for equality comparisons.
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(xs: AsyncStream<A>) => (ys: AsyncStream<A>) => AsyncStream<A>} A
 * function that takes async streams.
 * 
 * @__PURE__
 */
export function union<A>(E: Eq<A>) {
  /**
   * Takes an {@link AsyncStream} to union with another {@link AsyncStream}.
   *
   * @param {AsyncStream<A>} xs The first async stream.
   * @return {(ys: AsyncStream<A>) => AsyncStream<A>} A function that takes the
   * other async stream.
   * 
   * @step 1
   * @__PURE__
   */
  function _union(xs: AsyncStream<A>): (ys: AsyncStream<A>) => AsyncStream<A>

  /**
   * Takes an {@link AsyncStream} to union with another {@link AsyncStream}.
   *
   * @param {AsyncStream<A>} xs The first async stream.
   * @param {AsyncStream<A>} ys The second async stream.
   * @return {AsyncStream<A>} A new async stream containing unique values from
   * both async streams.
   * 
   * @step 1
   * @__PURE__
   */
  function _union(xs: AsyncStream<A>, ys: AsyncStream<A>): AsyncStream<A>
  function _union(xs: AsyncStream<A>, ys?: AsyncStream<A>): AsyncStream<A> | ((ys: AsyncStream<A>) => AsyncStream<A>) {
    if (typeof ys !== 'undefined') {
      return async function* __union() {
        const collected: A[] = []
        for await (const y of ys()) {
          yield y
          collected.push(y)
        }

        for await (const x of xs()) {
          if (!collected.some(it => E.equals(it, x))) {
            yield x
            collected.push(x)
          }
        }
      }
    }

    return function _union_union(my: AsyncStream<A>): AsyncStream<A> {
      return _union(xs, my)
    }
  }

  return _union
}
