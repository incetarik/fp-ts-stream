import { IO } from 'fp-ts/lib/IO'

import { AsyncStream } from './uri'

/**
 * Converts an {@link AsyncStream} of type `A` to an array of `A`.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The async stream source.
 * @return {Promise<A[]>} The async stream items as an array.
 * 
 * @__PURE__
 */
export async function toArray<A>(fa: AsyncStream<A>): Promise<A[]> {
  const array: A[] = []
  for await (const a of fa()) {
    array.push(a)
  }

  return array
}

/**
 * Converts an iterable to an {@link AsyncStream} of type `A`.
 *
 * @export
 * @template A The value type.
 * @param {Iterable<A>} a The iterable input of `A` values.
 * @return {AsyncStream<A>} A async stream of of the values found in the given
 * iterable.
 * 
 * @__PURE__
 */
export function fromIterable<A>(a: Iterable<A>): AsyncStream<A> {
  return async function* _fromIterable() {
    for (const item of a) {
      yield item
    }
  }
}

/**
 * Converts an iterable to an {@link AsyncStream} of type `A`.
 *
 * @export
 * @template A The value type.
 * @param {AsyncIterable<A>} a The iterable input of `A` values.
 * @return {AsyncStream<A>} A async stream of of the values found in the given
 * iterable.
 * 
 * @__PURE__
 */
export function fromAsyncIterable<A>(a: AsyncIterable<A>): AsyncStream<A> {
  return async function* _fromIterable() {
    for await (const item of a) {
      yield item
    }
  }
}

/**
 * Creates an {@link AsyncStream} from an {@link IO} instance.
 *
 * @export
 * @template A The value type.
 * @param {IO<A>} fa The io instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromIO<A>(fa: IO<A>): AsyncStream<A> {
  return async function* _fromIO() {
    yield fa()
  }
}

