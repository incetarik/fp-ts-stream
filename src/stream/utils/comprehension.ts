import { constTrue } from 'fp-ts/lib/function'
import { ReadonlyNonEmptyArray } from 'fp-ts/lib/ReadonlyNonEmptyArray'

import { Stream } from '../uri'

type UnwrapOutputs<
  SA extends ReadonlyArray<Stream<unknown>>,
  Output extends ReadonlyArray<unknown> = []
> = SA extends readonly [
  Stream<infer H>,
  ...infer R extends ReadonlyArray<Stream<unknown>>
] ? UnwrapOutputs<R, [ ...Output, H ]> : Output

type OutputMapper<
  T extends ReadonlyArray<Stream<unknown>>,
  R
> = (...args: [ ...UnwrapOutputs<T> ]) => R

type Condition<
  T extends ReadonlyArray<Stream<unknown>>
> = OutputMapper<T, boolean>

/**
 * {@link Stream} comprehension.
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
 * @return {Stream<R>} The output stream.
 * 
 * @__PURE__
 */
export function comprehension<R, I extends ReadonlyNonEmptyArray<Stream<unknown>>>(
  input: I,
  f: OutputMapper<I, R>,
  g?: Condition<I>
): Stream<R> {
  return function* _comprehension() {
    g ??= constTrue

    function* go(
      mas: Stream<unknown>[],
      collected: Array<unknown>,
      depth = 0
    ): Generator<R> {

      if (mas.length === 1) {
        const ma = mas[ 0 ]
        for (const a of ma()) {
          collected[ depth ] = a
          if (g!(...(collected as any))) {
            yield f(...(collected as any))
          }
        }
      }
      else {
        const ma = mas.shift()!
        for (const a of ma()) {
          collected[ depth ] = a
          yield* go(mas, collected, depth + 1)
        }
      }
    }

    yield* go([ ...input ], new Array(input.length))
  }
}
