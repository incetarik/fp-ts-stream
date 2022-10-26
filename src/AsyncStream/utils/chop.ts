import { AsyncStream } from '../uri'
import { prepend } from './prepend'

/**
 * A useful recursion pattern for processing an {@link AsyncStream} to produce
 * a new array, often used for "chopping" up the input {@link AsyncStream}.
 * 
 * Typically `chop` is called with some function that will consume an initial
 * prefix of the {@link AsyncStream} and produce a value and the rest of the
 * {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @template B The chopped value type.
 * @param {(fa: AsyncStream<A>) => [ B, AsyncStream<A> ] | Promise<[ B, AsyncStream<A> ]>} f The chop function.
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes a stream to
 * chop the first element of it.
 * 
 * @__PURE__
 */
export function chop<A, B>(f: (fa: AsyncStream<A>) => [ B, AsyncStream<A> ] | Promise<[ B, AsyncStream<A> ]>) {
  /**
   * Chops the given {@link AsyncStream} and returns another {@link AsyncStream}
   * based on the previously given function.
   *
   * @param {AsyncStream<A>} fa The input async stream.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @__PURE__
   */
  return function _chop(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __chop() {
      let target = fa

      while (true) {
        const [ b, nextStream ] = await f(target)
        yield b

        // Executing the stream manually to prevent calling the generator
        // step twice as this `Promise` may be taking time to be calculated.
        const nextGen = nextStream()
        const { value, done } = await nextGen.next()

        if (done) { return }

        // If there are elements remaining to chop, prepend the fetched value
        // and continue with the rest.
        target = prepend(value)(() => nextGen)
      }
    }
  }
}

