
/**
 * Describes a function which returns a {@link AsyncGenerator} of `A` values.
 *
 * @export
 * @interface AsyncStream
 * @template A The value type.
 */
export interface AsyncStream<A> {
  (): AsyncGenerator<A>
}

/**
 * The type URI of the {@link AsyncStream} instances.
 *
 * @category type lambdas
 */
export const URI = 'fp-ts-stream/AsyncStream'

/**
 * The type URI of the {@link AsyncStream} instances.
 *
 * @category type lambdas
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [ URI ]: AsyncStream<A>
  }
}
