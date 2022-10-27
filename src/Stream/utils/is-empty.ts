import { Stream } from '../uri'

/**
 * Tests whether a {@link Stream} is empty.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} fa The input stream.
 * @return {boolean} `true` if the stream was empty, `false` otherwise.
 * 
 * @__PURE__
 */
export function isEmpty<A>(fa: Stream<A>) {
  const gen = fa()
  const { done } = gen.next()
  return done
}

/**
 * Tests whether a {@link Stream} is not empty.
 *
 * @export
 * @template A The value type.
 * @param {Stream<A>} ma The input stream.
 * @return {boolean} `true` if the stream was not empty, `false` otherwise.
 * 
 * @__PURE__
 */
export function isNotEmpty<A>(ma: Stream<A>) { return !isEmpty(ma) }
