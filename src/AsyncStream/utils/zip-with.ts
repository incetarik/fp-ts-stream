import { AsyncStream } from '../uri'
import { zip } from './zip'

/**
 * Apply a function to pairs of elements at the same index in
 * two {@link AsyncStream}s, collecting the results in a
 * new {@link AsyncStream}.
 * 
 * If one input {@link AsyncStream} is shorter, excess elements
 * of the other are discarded.
 *
 * @export
 * @template A The first value type.
 * @template B The second value type.
 * @template C The result value type.
 * @param {AsyncStream<A>} fa The first async stream.
 * @param {AsyncStream<B>} fb The second async stream.
 * @param {(a: A, b: B) => C | Promise<C>} f The mapper function.
 * @return {AsyncStream<C>} The output async stream.
 * 
 * @__PURE__
 */
export function zipWith<A, B, C>(fa: AsyncStream<A>, fb: AsyncStream<B>, f: (a: A, b: B) => C | Promise<C>): AsyncStream<C> {
  return async function* _zipWith() {
    for await (const ms of zip(fa, fb)()) {
      const itemGen = ms()

      let curr = await itemGen.next()
      if (curr.done) return
      const a = curr.value as A

      curr = await itemGen.next()
      if (curr.done) return
      const b = curr.value as B

      yield await f(a, b)
    }
  }
}
