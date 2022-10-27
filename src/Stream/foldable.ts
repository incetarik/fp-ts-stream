import { reduceRightWithIndex as arrayReduceRightWithIndex } from 'fp-ts/Array'
import { Foldable1 } from 'fp-ts/lib/Foldable'
import { FoldableWithIndex1 } from 'fp-ts/lib/FoldableWithIndex'
import { pipe } from 'fp-ts/lib/function'
import { Monoid } from 'fp-ts/lib/Monoid'

import { toArray } from './conversions'
import { Stream, URI } from './uri'

/**
 * Map and fold a {@link Stream}.
 * 
 * Map the {@link Stream} passing each value to the iterating function.
 * Then fold the results using the provided {@link Monoid}.
 *
 * @export
 * @template M The monoid type.
 * @param {Monoid<M>} M The monoid instance.
 * @return {<A>(f: (a: A) => M)} A function that will take the iterating
 * function.
 * 
 * @category folding
 * @__PURE__
 */
export function foldMap<M>(M: Monoid<M>) {
  /**
   * Map and fold a {@link Stream} with given function.
   *
   * @template A The value type.
   * @param {(a: A) => M} f The mapping function.
   * @return {(fa: Stream<A>) => M} A function that takes a stream and returns
   * the folded value.
   * 
   * @category folding
   * @__PURE__
   */
  return function _foldMap<A>(f: (a: A) => M) {
    const folder = foldMapWithIndex<M>(M)<A>
    return folder((_, a) => f(a))
  }
}

/**
 * Same as {@link foldMap} but passing also the index to the iterating function.
 *
 * @export
 * @template M The monoid type.
 * @param {Monoid<M>} M The monoid instance.
 * @return {<A>(f: (i: number, a: A) => M)} A function that takes a stream and
 * returns the folded value. 
 * 
 * @category folding
 * @__PURE__
 */
export function foldMapWithIndex<M>(M: Monoid<M>) {
  /**
   * Map and fold a {@link Stream} with given function.
   *
   * @template A The value type.
   * @param {(i: number, a: A) => M} f The mapping function.
   * @return {(fa: Stream<A>) => M} A function that takes a stream and returns
   * the folded value.
   * 
   * @category folding
   * @__PURE__
   */
  return function _foldMapWithIndex<A>(f: (i: number, a: A) => M) {
    return function __foldmapWithIndex(fa: Stream<A>): M {
      let index = 0
      let last = M.empty

      for (const a of fa()) {
        last = M.concat(last, f(index++, a))
      }

      return last
    }
  }
}

/**
 * Same as {@link reduce} but passing also the index to the iterating function.
 *
 * @export
 * @template A The value type.
 * @template B The reducing value type.
 * @param {B} b The initial value.
 * @param {(i: number, b: B, a: A) => B} f The reducing function.
 * @return {(fa: Stream<A>) => B} A function that takes a stream and returns
 * the reduced value.
 * 
 * @category folding
 * @__PURE__
 */
export function reduceWithIndex<A, B>(b: B, f: (i: number, b: B, a: A) => B) {
  /**
   * Reduces a {@link Stream}.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {B} The reduced value.
   * 
   * @category folding
   * @__PURE__
   */
  return function _reduceWithIndex(fa: Stream<A>): B {
    let index = 0

    for (const a of fa()) {
      b = f(index++, b, a)
    }

    return b
  }
}

/**
 * Reduces a {@link Stream}.
 * 
 * `reduce` executes the supplied iterating function on each element of the
 * stream in order, passing in the element and the return value from the
 * calculation on the preceding element.
 * 
 * The first time that the iterating function is called there is no
 * "return value of the previous calculation", the initial value is used in
 * its place.
 *
 * @export
 * @template A The value type.
 * @template B The reducing value type.
 * @param {B} b The initial value.
 * @param {(b: B, a: A) => B} f The reducing function.
 * @return {(fa: Stream<A>) => B} Takes a stream and returns the reduced value.
 * 
 * @category folding
 * @__PURE__
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B) {
  return /**#__PURE__ */ reduceWithIndex<A, B>(b, (_, b, a) => f(b, a))
}

/**
 * Same as {@link reduce} but applied from the end to the start.
 * 
 * *Note*: The iterating function in this case takes the accumulator as the
 * last argument.
 *
 * @export
 * @template A The value type.
 * @template B The reducing value type.
 * @param {B} b The initial value.
 * @param {(i: number, b: B, a: A) => B} f The reducing function.
 * @return {(fa: Stream<A>) => B} A function that takes a stream and returns the
 * reduced value.
 */
export function reduceRightWithIndex<A, B>(b: B, f: (i: number, b: B, a: A) => B) {
  /**
   * Reduces a {@link Stream} from the end to the start.
   *
   * @param {Stream<A>} fa The input stream.
   * @return {B} The reduced value.
   * 
   * @category folding
   * @__PURE__
   */
  return function _reduceRightWithIndex(fa: Stream<A>): B {
    return pipe(
      fa,
      toArray,
      arrayReduceRightWithIndex(b, (i, _a, _b) => f(i, _b, _a))
    )
  }
}

/**
 * Same as {@link reduce} but applied from the end to the start.
 *
 * @export
 * @template A The value type.
 * @template B The reducing value type.
 * @param {B} b The initial value.
 * @param {(a: A, b: B) => B} f The reducing function.
 * @return {(fa: Stream<A>) => B} A function that takes a stream and returns
 * the reduced value.
 * 
 * @category folding
 * @__PURE__
 */
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B) {
  return /**#__PURE__ */ reduceRightWithIndex<A, B>(b, (_, b, a) => f(a, b))
}

/**
 * The `Foldable` category instance for {@link Stream}.
 * 
 * @category model
 */
export const Foldable: Foldable1<URI> = {
  URI,
  foldMap<M>(M: Monoid<M>) {
    return function _foldMap<A>(fa: Stream<A>, f: (a: A) => M) {
      return foldMap(M)(f)(fa)
    }
  },
  reduce(fa, b, f) { return reduce(b, f)(fa) },
  reduceRight(fa, b, f) { return reduceRight(b, f)(fa) },
}

/**
 * The `FoldableWithIndex` category instance for {@link Stream}.
 * 
 * @category model
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, number> = {
  URI,
  foldMap: Foldable.foldMap,
  reduce: Foldable.reduce,
  reduceRight: Foldable.reduceRight,
  foldMapWithIndex(M) {
    return function _foldMapWithIndex(fa, f) {
      return foldMapWithIndex(M)(f)(fa)
    }
  },
  reduceRightWithIndex<A, B>(fa: Stream<A>, b: B, f: (i: number, a: A, b: B) => B): B {
    return reduceRightWithIndex<A, B>(b, (i, b, a) => f(i, a, b))(fa)
  },
  reduceWithIndex(fa, b, f) {
    return reduceWithIndex(b, f)(fa)
  },
}
