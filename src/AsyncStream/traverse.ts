import { identity, pipe } from 'fp-ts/lib/function'
import { ReadonlyNonEmptyArray } from 'fp-ts/lib/ReadonlyNonEmptyArray'

import { AsyncStream } from './uri'
import { zero } from './zero'

/**
 * Similar to `ReadonlyArray.traverseWithIndex(ApplicativePar)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(index: number, a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: ReadonlyArray<A>) => AsyncStream<ReadonlyArray<B>>} A function
 * that takes an array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseArrayWithIndex<A, B>(f: (index: number, a: A) => AsyncStream<B>) {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {ReadonlyArray<A>} as The input array.
   * @return {AsyncStream<ReadonlyArray<B>>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseArrayWithIndex(as: ReadonlyArray<A>): AsyncStream<ReadonlyArray<B>> {
    const size = as.length
    if (size === 0) return zero()

    return async function* __traverseArrayWithIndex() {
      const streams = as.map((a, index) => f(index, a)())
      while (streams.length) {
        const values$
          = streams.map((gen, i) => gen.next().then(a => [ a, i ] as const))

        const collectedResults: B[] = []

        const values = await Promise.all(values$)
        for (let i = values.length - 1; i >= 0; --i) {
          const [ result, index ] = values[ i ]
          const { value, done } = result

          if (done) {
            streams.splice(index, 1)
            continue
          }

          collectedResults.push(value)
        }

        if (collectedResults.length > 0) {
          yield collectedResults
        }
        else {
          break
        }
      }
    }
  }
}

/**
 * Similar to `ReadonlyNonEmptyArray.traverseWithIndex(ApplicativePar)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(index: number, a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: ReadonlyNonEmptyArray<A>) => AsyncStream<B>} A function that
 * takes an array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseReadonlyNonEmptyArrayWithIndex<A, B>(
  f: (index: number, a: A) => AsyncStream<B>
): (as: ReadonlyNonEmptyArray<A>) => AsyncStream<ReadonlyNonEmptyArray<B>> {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {ReadonlyNonEmptyArray<A>} as The input array.
   * @return {AsyncStream<ReadonlyNonEmptyArray<B>>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseReadonlyNonEmptyArrayWithIndex(as: ReadonlyNonEmptyArray<A>) {
    const input = as as unknown as A[]
    return async function* __traverseReadonlyNonEmptyArrayWithIndex() {
      for await (const bs of traverseArrayWithIndex(f)(input)()) {
        yield bs as unknown as ReadonlyNonEmptyArray<B>
      }
    }
  }
}

/**
 * Similar to `ReadonlyArray.traverseWithIndex(ApplicativePar)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(index: number, a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: ReadonlyArray<A>) => AsyncStream<ReadonlyArray<B>>} A function
 * that takes an array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseReadonlyArrayWithIndex<A, B>(
  f: (index: number, a: A) => AsyncStream<B>
): (as: readonly A[]) => AsyncStream<readonly B[]> {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {readonly A[]} as The input array.
   * @return {AsyncStream<readonly B[]>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseReadonlyArrayWithIndex(as) {
    return traverseArrayWithIndex(f)(as)
  }
}

/**
 * Similar to `ReadonlyArray.traverseWithIndex(ApplicativeSeq)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(index: number, a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: A[]) => AsyncStream<B>} A function that takes an array of `A`
 * and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseArrayWithIndexSeq<A, B>(
  f: (index: number, a: A) => AsyncStream<B>
) {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {ReadonlyArray<A>} as The input array.
   * @return {AsyncStream<ReadonlyArray<B>>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseArrayWithIndexSeq(as: ReadonlyArray<A>): AsyncStream<ReadonlyArray<B>> {
    const size = as.length
    if (size === 0) return zero()

    return async function* __traverseArrayWithIndexSeq() {
      const streams = as.map((it, i) => f(i, it)())
      let values: B[] = []

      while (streams.length) {
        let removed = 0
        for (let i = 0, limit = streams.length; i < limit; ++i) {
          const stream = streams[ i - removed ]
          const { value, done } = await stream.next()

          if (done) {
            ++removed
            streams.splice(i, 1)
            continue
          }

          values.push(value)
        }

        if (values.length > 0) {
          yield values
          values = []
        }
        else {
          break
        }
      }
    }
  }
}

/**
 * Similar to `ReadonlyNonEmptyArray.traverseWithIndex(ApplicativeSeq)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(index: number, a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: ReadonlyNonEmptyArray<A>) => AsyncStream<B>} A function that
 * takes an array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseReadonlyNonEmptyArrayWithIndexSeq<A, B>(
  f: (index: number, a: A) => AsyncStream<B>
) {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {ReadonlyNonEmptyArray<A>} as The input array.
   * @return {AsyncStream<ReadonlyNonEmptyArray<B>>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseReadonlyNonEmptyArrayWithIndexSeq(as: ReadonlyNonEmptyArray<A>): AsyncStream<ReadonlyNonEmptyArray<B>> {
    const input = as as unknown as A[]
    return async function* __traverseReadonlyNonEmptyArrayWithIndexSeq() {
      for await (const bs of traverseArrayWithIndexSeq(f)(input)()) {
        yield bs as unknown as ReadonlyNonEmptyArray<B>
      }
    }
  }
}

/**
 * Similar to `ReadonlyArray.traverseWithIndex(ApplicativeSeq)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(index: number, a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: readonly A[]) => AsyncStream<readonly B[]>} A function that
 * takes an array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseReadonlyArrayWithIndexSeq<A, B>(
  f: (index: number, a: A) => AsyncStream<B>
) {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {readonly A[]} as The input array.
   * @return {AsyncStream<readonly B[]>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseReadonlyArrayWithIndexSeq(as: readonly A[]): AsyncStream<readonly B[]> {
    return traverseArrayWithIndexSeq(f)(as)
  }
}

/**
 * Similar to `ReadonlyArray.traverse(ApplicativePar)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: ReadonlyArray<A>) => AsyncStream<B>} A function that takes an
 * array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseArray<A, B>(f: (a: A) => AsyncStream<B>) {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {readonly A[]} as The input array.
   * @return {AsyncStream<readonly B[]>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseArray(as: readonly A[]): AsyncStream<readonly B[]> {
    return traverseArrayWithIndex<A, B>((_, a) => f(a))(as)
  }
}

/**
 * Similar to `ReadonlyArray.sequence(ApplicativePar)`.
 *
 * @export
 * @template A The input value type.
 * @param {ReadonlyArray<AsyncStream<A>>} arr The input async streams.
 * @return {AsyncStream<ReadonlyArray<A>>} The async stream of an array of `A`
 * values.
 * 
 * @category traversing
 * @__PURE__
 */
export function sequenceArray<A>(arr: ReadonlyArray<AsyncStream<A>>): AsyncStream<ReadonlyArray<A>> {
  return pipe(
    arr,
    traverseArray(identity)
  )
}

/**
 * Similar to `ReadonlyArray.traverse(ApplicativeSeq)`.
 *
 * @export
 * @template A The input value type.
 * @template B The output value type.
 * @param {(a: A) => AsyncStream<B>} f The mapper function.
 * @return {(as: ReadonlyArray<A>) => AsyncStream<B>} A function that takes an
 * array of `A` and returns an async stream of `B`.
 * 
 * @category traversing
 * @__PURE__
 */
export function traverseSeqArray<A, B>(f: (a: A) => AsyncStream<B>) {
  /**
   * Takes an array of `A` to traverse with the previously given function.
   *
   * @param {readonly A[]} as The input array.
   * @return {AsyncStream<readonly B[]>} The output async stream.
   * 
   * @step 1
   * @category traversing
   * @__PURE__
   */
  return function _traverseSeqArray(as: readonly A[]): AsyncStream<readonly B[]> {
    return traverseArrayWithIndexSeq<A, B>((_, a) => f(a))(as)
  }
}

/**
 * Similar to `ReadonlyArray.sequence(ApplicativeSeq)`.
 *
 * @export
 * @template A The input value type.
 * @param {ReadonlyArray<AsyncStream<A>>} arr The input async streams.
 * @return {AsyncStream<ReadonlyArray<A>>} The async stream of an array of `A`
 * values.
 * 
 * @category traversing
 * @__PURE__
 */
export function sequenceSeqArray<A>(arr: ReadonlyArray<AsyncStream<A>>): AsyncStream<ReadonlyArray<A>> {
  return pipe(
    arr,
    traverseSeqArray(identity)
  )
}
