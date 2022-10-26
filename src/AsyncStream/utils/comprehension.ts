import { constTrue } from 'fp-ts/lib/function'
import { ReadonlyNonEmptyArray } from 'fp-ts/lib/ReadonlyNonEmptyArray'

import { AsyncStream } from '../uri'

type UnwrapOutputs<
  SA extends ReadonlyArray<AsyncStream<unknown>>,
  Output extends ReadonlyArray<unknown> = []
> = SA extends readonly [
  AsyncStream<infer H>,
  ...infer R extends ReadonlyArray<AsyncStream<unknown>>
] ? UnwrapOutputs<R, [ ...Output, H ]> : Output

type OutputMapper<
  T extends ReadonlyArray<AsyncStream<unknown>>,
  R
> = (...args: [ ...UnwrapOutputs<T> ]) => R

type Condition<
  T extends ReadonlyArray<AsyncStream<unknown>>
> = OutputMapper<T, boolean>

/**
 * {@link AsyncStream} comprehension.
 * 
 * ```
 * { f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) }
 * ```
 *
 * @export
 * @template R The output type.
 * @template I The input parameters array type.
 * @param {I} input The input streams.
 * @param {OutputMapper<I, R>} f The output mapper function.
 * @param {Condition<I>} [g] Optional condition function.
 * @return {AsyncStream<R>} The output async stream.
 * 
 * @__PURE__
 */
export function comprehension<R, I extends ReadonlyNonEmptyArray<AsyncStream<unknown>>>(
  input: I,
  f: OutputMapper<I, R>,
  g?: Condition<I>
): AsyncStream<R> {
  return async function* _comprehension() {
    g ??= constTrue

    async function* go(
      mas: AsyncStream<unknown>[],
      collected: Array<unknown>,
      depth = 0
    ): AsyncGenerator<R> {

      if (mas.length === 1) {
        const ma = mas[ 0 ]
        for await (const a of ma()) {
          collected[ depth ] = a
          if (g!(...(collected as any))) {
            yield f(...(collected as any))
          }
        }
      }
      else {
        const ma = mas.shift()!
        for await (const a of ma()) {
          collected[ depth ] = a
          yield* go(mas, collected, depth + 1)
        }
      }
    }

    yield* go([ ...input ], new Array(input.length))
  }
}
