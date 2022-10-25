import { guard as zeroGuard, Zero1 } from 'fp-ts/lib/Zero'

import { Pointed } from './pointed'
import { AsyncStream, URI } from './uri'

/**
 * Returns an empty {@link AsyncStream} of type `A`.
 *
 * @export
 * @template A The value type.
 * @return {AsyncStream<A>} A {@link AsyncStream} instance that will yield no
 * values.
 * 
 * @category model
 * @__PURE__
 */
export function zero<A>(): AsyncStream<A> {
  return async function* _zero() {}
}

/**
 * An empty {@link AsyncStream} instance.
 */
export const empty = zero<never>()

/**
 * The `Zero` category instance for {@link AsyncStream}.
 * 
 * @category model
 */
export const Zero: Zero1<URI> = {
  URI,
  zero,
}

/**
 * @category do notation
 */
export const guard = zeroGuard(Zero, Pointed)

/**
 * An {@link AsyncStream} that never completes.
 *
 * @export
 * @template A The value type.
 * @return {AsyncStream<A>} The async stream that never completes.
 * 
 * @__PURE__
 */
export function makeNever<A = never>(): AsyncStream<A> {
  return function _never(): AsyncGenerator<A, void, void> {
    return {
      next() {
        return new Promise<IteratorResult<A>>(_resolve => {
          // Never resolves
        })
      },
      return() {
        return Promise.resolve({ done: true, value: undefined })
      },
      throw: Promise.reject,
      [ Symbol.asyncIterator ]() { return this }
    }
  }
}

/**
 * An {@link AsyncStream} that never completes.
 *
 * @export
 * @template A The value type.
 * 
 * @__PURE__
 */
export const never = makeNever()
