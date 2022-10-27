import { modifyAt } from './modify-at'

/**
 * Changes the element at the specified index, creating a new {@link Stream}.
 *
 * @export
 * @template A The value type.
 * @param {number} i The index of element to modify.
 * @param {A} a The value to set.
 * @return {Stream<A>} The stream whose value at given
 * index is modified.
 * 
 * @__PURE__
 */
export function updateAt<A>(i: number, a: A) {
  return modifyAt<A>(i, (_) => a)
}
