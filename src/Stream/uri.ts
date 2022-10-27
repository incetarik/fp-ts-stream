
/**
 * Describes a function which returns a {@link Generator} of `A` values.
 *
 * @export
 * @interface Stream
 * @template A The value type.
 */
export interface Stream<A> {
  (): Generator<A>
}

/**
 * The type URI of the {@link Stream} instances.
 * 
 * @category type lambdas
 */
export const URI = 'Stream'

/**
 * The type URI of the {@link Stream} instances.
 * 
 * @category type lambdas
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [ URI ]: Stream<A>
  }
}
