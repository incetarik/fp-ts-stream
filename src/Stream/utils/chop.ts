import { Stream } from '../uri'
import { prepend } from './prepend'

/**
 * A useful recursion pattern for processing a {@link Stream} to produce a new
 * array, often used for "chopping" up the input {@link Stream}. Typically
 * `chop` is called with some function that will consume an initial prefix of
 * the {@link Stream} and produce a value and the rest of the {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @template B The chopped value type.
 * @param {(fa: Stream<A>) => [ B, Stream<A> ]} f The chop function.
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream to
 * chop the first element of it.
 * 
 * @__PURE__
 */
export function chop<A, B>(f: (fa: Stream<A>) => [ B, Stream<A> ]) {
  /**
   * Chops the given {@link Stream} and returns another {@link Stream} based
   * on the previously given function.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {Stream<B>} The output stream.
   * 
   * @__PURE__
   */
  return function _chop(fa: Stream<A>): Stream<B> {
    return function* __chop() {
      let target = fa

      while (true) {
        const [ b, nextStream ] = f(target)
        yield b

        // Executing the stream manually to prevent invoking the next twice.
        const nextGen = nextStream()
        const { value, done } = nextGen.next()

        if (done) { return }

        target = prepend(value)(() => nextGen)
      }
    }
  }
}
