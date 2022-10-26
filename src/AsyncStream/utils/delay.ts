import { AsyncStream } from '../uri'

/**
 * Creates an {@link AsyncStream} that will complete after a time delay.
 *
 * @export
 * @param {number} millis The amount of time to delay in milliseconds.
 * @return {<A>(ma: AsyncStream<A>) => AsyncStream<A>} A function that takes an
 * async stream to delay.
 * 
 * @__PURE__
 */
export function delay(millis: number) {
  /**
   * Takes an {@link AsyncStream} to delay as much as the previously given
   * milliseconds.
   *
   * @template A The value type.
   * @param {AsyncStream<A>} ma The input async stream.
   * @return {AsyncStream<A>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _delay<A>(ma: AsyncStream<A>): AsyncStream<A> {
    return async function* __delay() {
      await new Promise(resolve => setTimeout(resolve, millis))
      yield* ma()
    }
  }
}
