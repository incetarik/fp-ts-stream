import { Task } from 'fp-ts/lib/Task'

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
 * Creates an {@link AsyncStream} from an iterable of {@link Promise}s.
 * 
 * Yields elements at when a promise in the iterable is resolved. Therefore,
 * the elements might not be in-order.
 * 
 * If the order is important, use {@link fromPromisesSeq}.
 *
 * @export
 * @template A The value type.
 * @param {Iterable<Promise<A>>} input The input promises.
 * @return {AsyncStream<A>} An async stream output.
 * 
 * @__PURE__
 */
export function fromPromises<A>(input: Iterable<Promise<A>>): AsyncStream<A> {
  return async function* _fromPromises() {
    const indexMap = new WeakMap<Promise<A>, number>()
    let size = 0
    let alreadyCompleted = 0

    const remaining: Promise<[ number, A ]>[] = []
    const targetIndex: number[] = []

    for (const fa of input) {
      const oldIndex = size
      indexMap.set(fa, size - alreadyCompleted)
      targetIndex.push(size - alreadyCompleted)
      size++

      remaining.push(fa.then(a => {
        ++alreadyCompleted
        const newIndex = targetIndex[ oldIndex ]

        for (let i = oldIndex + 1; i < size; ++i) {
          --targetIndex[ i ]
        }

        return [ newIndex, a ]
      }))
    }

    while (remaining.length) {
      const [ newIndex, a ] = await Promise.any(remaining)
      remaining.splice(newIndex, 1)
      yield a
    }
  }
}

/**
 * Similar to {@link fromPromises} but the order is preserved.
 *
 * @export
 * @template A The value type.
 * @param {Iterable<Promise<A>>} input The input promises.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @__PURE__
 */
export function fromPromisesSeq<A>(input: Iterable<Promise<A>>): AsyncStream<A> {
  return async function* _fromPromisesSeq() {
    for (const fa of input) {
      yield await fa
    }
  }
}

/**
 * Converts an {@link AsyncStream} to a {@link Task} of the array of
 * the elements.
 *
 * @export
 * @template A The value type.
 * @param {AsyncStream<A>} fa The input async stream.
 * @return {Task<A[]>} The output task.
 * 
 * @__PURE__
 */
export function toTask<A>(fa: AsyncStream<A>): Task<A[]> {
  return () => toArray(fa)
}
