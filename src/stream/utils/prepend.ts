import { Stream } from '../uri'

/**
 * Less strict version of {@link prepend}.
 *
 * @export
 * @template B The value type.
 * @param {B} head The value to prepend to the stream.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream to
 * modify.
 * 
 * @__PURE__
 */
export function prependW<B>(head: B) {
  /**
   * Takes a {@link Stream} to prepend the previously given value.
   *
   * @template A The value type.
   * @param {Stream<A>} fa The input stream.
   * @return {(Stream<A | B>)} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _prepend<A>(fa: Stream<A>): Stream<A | B> {
    return function* __prepend() {
      yield head
      yield* fa()
    }
  }
}

/**
 * Prepends an element to the front of the {@link Stream}, creating a new
 * {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {A} head The value to prepend to the stream.
 * @return {(fa: Stream<A>) => Stream<A>} A function that takes a stream to
 * modify.
 * 
 * @__PURE__
 */
export function prepend<A>(head: A) {
  return prependW<A>(head)<A>
}
