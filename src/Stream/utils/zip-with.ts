import { Stream } from '../uri'
import { zip } from './zip'

/**
 * Apply a function to pairs of elements at the same index in
 * two {@link Stream}s, collecting the results in a new {@link Stream}.
 * 
 * If one input {@link Stream} is shorter, excess elements
 * of the other are discarded.
 *
 * @export
 * @template A The first value type.
 * @template B The second value type.
 * @template C The result value type.
 * @param {Stream<A>} fa The first stream.
 * @param {Stream<B>} fb The second stream.
 * @param {(a: A, b: B) => C} f The mapper function.
 * @return {Stream<C>} The output stream.
 * 
 * @__PURE__
 */
export function zipWith<A, B, C>(fa: Stream<A>, fb: Stream<B>, f: (a: A, b: B) => C): Stream<C> {
  return function* _zipWith() {
    for (const ms of zip(fa, fb)()) {
      const itemGen = ms()

      let curr = itemGen.next()
      if (curr.done) return
      const a = curr.value as A

      curr = itemGen.next()
      if (curr.done) return
      const b = curr.value as B

      yield f(a, b)
    }
  }
}
