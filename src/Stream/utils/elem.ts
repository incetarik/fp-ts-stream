import { Eq } from 'fp-ts/lib/Eq'
import { pipe } from 'fp-ts/lib/function'
import { isSome } from 'fp-ts/lib/Option'

import { Stream } from '../uri'
import { findFirst } from './find-first'

/**
 * Tests if a value is a member of a {@link Stream}.
 * 
 * Takes a {@link Eq} of `A` as a single argument which returns the function
 * to use to search for a value of type `A` in a {@link Stream}.
 * 
 * **Warning: This function consumes the stream.**
 *
 * @export
 * @template A The value type.
 * @param {Eq<A>} E The equality instance.
 * @return {(a: A) => (fa: Stream<A>) => boolean} A function to use to search
 * for a value in the stream.
 * 
 * @__PURE__
 */
export function elem<A>(E: Eq<A>) {
  /**
   * Takes an element to test if that is a member of a {@link Stream}.
   *
   * @param {A} a The value to test if that is in the stream.
   * @return {(fa: Stream<A>) => boolean} A function that will take
   * the stream to search.
   * 
   * @step 1
   * @__PURE__
   */
  function _elem(a: A): (fa: Stream<A>) => boolean

  /**
   * Takes an element to test if that is a member of a {@link Stream}.
   *
   * @param {A} a The value to test if that is in the stream.
   * @param {Stream<A>} fa The stream to search the element.
   * @return {boolean} `true` if the element is a member of the stream,
   * `false` otherwise.
   * 
   * @step 1
   * @__PURE__
   */
  function _elem(a: A, fa: Stream<A>): boolean
  function _elem(a: A, fa?: Stream<A>): ((fa: Stream<A>) => boolean) | boolean {
    if (typeof fa !== 'undefined') {
      return pipe(fa, findFirst(_a => E.equals(a, _a)), isSome)
    }

    return function __elem(ma: Stream<A>): boolean {
      return _elem(a, ma)
    }
  }

  return _elem
}
