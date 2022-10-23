import { identity, pipe } from 'fp-ts/lib/function'

import { Stream } from './uri'

/**
 * Equivalent to `ReadonlyArray.traverse(Applicative)`
 *
 * @export
 * @template A The value type.
 * @template B The output type.
 * @param {(a: A) => Stream<B>} f The mapping function.
 * @return {(as: ReadonlyArray<A>) => Stream<ReadonlyArray<B>>} A function that
 * takes an array of `A` and returns a stream of array of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseArray<A, B>(f: (a: A) => Stream<B>) {
  /**
   * Takes an array of `A` and returns a {@link Stream} of array of `B`.
   *
   * @param {ReadonlyArray<A>} as The input array.
   * @return {Stream<ReadonlyArray<B>>} The output stream.
   * 
   * @category traversing
   * @step 1
   * @__PURE__
   */
  return function _traverseArray(as: ReadonlyArray<A>): Stream<ReadonlyArray<B>> {
    return function* __traverseArray() {
      const result: B[] = []

      for (const a of as) {
        const gen = f(a)()
        let { value, done } = gen.next()

        if (done) {
          yield []
          return
        }

        result.push(value)
        for (const b of gen) { result.push(b) }
      }

      yield result
    }
  }
}

/**
 * Equivalent to `ReadonlyArray.sequence(Applicative)`
 *
 * @export
 * @template A The value type.
 * @param {ReadonlyArray<Stream<A>>} arr The input array.
 * @return {Stream<ReadonlyArray<A>>} The output stream.
 * 
 * @category traversing
 * @__PURE__
 */
export function sequenceArray<A>(arr: ReadonlyArray<Stream<A>>): Stream<ReadonlyArray<A>> {
  return pipe(
    arr,
    traverseArray(identity)
  )
}
