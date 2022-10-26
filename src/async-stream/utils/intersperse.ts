import { AsyncStream } from '../uri'

/**
 * Places an element in between members of an {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {A} middle The middle value.
 * @return {(fa: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to modify.
 * 
 * @__PURE__
 */
export function intersperse<A>(middle: A) {
  /**
   * Takes an {@link AsyncStream} to place the previously given element between
   * the members of it.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _intersperse(fa: AsyncStream<A>): AsyncStream<A> {
    return async function* __intersperse() {
      const gen = fa()
      let curr = await gen.next()

      if (curr.done) return
      yield curr.value

      while (true) {
        const curr = await gen.next()
        if (curr.done) break
        yield middle
        yield curr.value
      }
    }
  }
}
