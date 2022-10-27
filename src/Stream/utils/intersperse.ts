import { Stream } from '../uri'

/**
 * Places an element in between members of a {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {A} middle The middle value.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream to
 * modify.
 * 
 * @__PURE__
 */
export function intersperse<A>(middle: A) {
  /**
   * Takes a {@link Stream} to place the previously given element between the
   * members of it.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<A>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _intersperse(fa: Stream<A>): Stream<A> {
    return function* __intersperse() {
      const gen = fa()
      let curr = gen.next()

      if (curr.done) return
      yield curr.value

      while (true) {
        const curr = gen.next()
        if (curr.done) break
        yield middle
        yield curr.value
      }
    }
  }
}
