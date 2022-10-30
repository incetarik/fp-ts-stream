/**
 * Describes that the type passed might be sync or async.
 */
export type MaybeAsync<T> = T | Promise<T>
