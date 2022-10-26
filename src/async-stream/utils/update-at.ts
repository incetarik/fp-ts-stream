import { modifyAt } from './modify-at'

/**
 * Changes the element at the specified index, creating a new
 * {@link AsyncStream}.
 *
 * @export
 * @template A The value type.
 * @param {number} i The index of element to modify.
 * @param {A} a The value to set.
 * @return {AsyncStream<A>} The stream whose value at given
 * index is modified.
 * 
 * @__PURE__
 */
export function updateAt<A>(i: number, a: A) {
  return modifyAt<A>(i, (_) => a)
}
