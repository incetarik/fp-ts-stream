import {
  bind as chainBind,
  Chain1,
  chainFirst as chainChainFirst,
} from 'fp-ts/lib/Chain'
import { ChainRec1 } from 'fp-ts/lib/ChainRec'
import { Either, isLeft } from 'fp-ts/lib/Either'

import { Applicative } from './applicative'
import { Functor } from './functor'
import { of } from './pointed'
import { Stream, URI } from './uri'

/**
 * Chains a {@link Stream} by evaluating the function passed with the items
 * of it that returns another {@link Stream} instance of type `B`.
 *
 * @export
 * @template A The value type.
 * @template B The new value/output type.
 * @param {(a: A) => Stream<B>} f The function that produces a stream of type
 * `B` from given `A` value.
 * 
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream of
 * type `A` and returns another stream of type `B`. 
 * 
 * @__PURE__
 */
export function chain<A, B>(f: (a: A) => Stream<B>) {
  /**
   * Takes a {@link Stream} to pass its values to previously given function
   * that produces a {@link Stream} of values of type `B`.
   *
   * @param {Stream<A>} fa The source stream.
   * @return {Stream<B>} The chained output stream.
   * @step 1
   * 
   * @__PURE__
   */
  return function _chain(fa: Stream<A>): Stream<B> {
    return function* __chain() {
      for (const a of fa()) {
        yield* f(a)()
      }
    }
  }
}

/**
 * Chains a {@link Stream} by evaluating the function passed with the items
 * of it with an index that returns another {@link Stream} instance of type `B`.
 *
 * @export
 * @template A The value type.
 * @template B The new value/output type.
 * @param {(i: number, a: A) => Stream<B>} f The function that produces a
 * stream of type `B` from given `A` value.
 * 
 * @return {(fa: Stream<A>) => Stream<B>} A function that takes a stream of
 * type `A` and returns another stream of type `B`. 
 * 
 * @__PURE__
 */
export function chainWithIndex<A, B>(f: (i: number, a: A) => Stream<B>) {
  /**
   * Takes a {@link Stream} to pass its values to previously given function
   * that produces a {@link Stream} of values of type `B`.
   *
   * @param {Stream<A>} fa The source stream.
   * @return {Stream<B>} The chained output stream.
   * @step 1
   * 
   * @__PURE__
   */
  return function _chainWithIndex(fa: Stream<A>): Stream<B> {
    return function* __chainWithIndex() {
      let i = 0
      for (const a of fa()) {
        yield* f(i++, a)()
      }
    }
  }
}

/**
 * Recursively chain a {@link Stream} with a function that produces an
 * {@link Either} of `A` and `B` stream.
 * 
 * All the `A` items in the stream will be used to recursively produce more
 * streams to chain.
 *
 * @export
 * @template A The producing type.
 * @template B The output type.
 * @param {(a: A) => Stream<Either<A, B>>} f The stream producter function.
 * @return {(a: A) => Stream<B>} A function that takes an initial value to
 * start producing `B`s.
 * 
 * @__PURE__
 */
export function chainRecDepthFirst<A, B>(f: (a: A) => Stream<Either<A, B>>) {
  /**
   * Takes an initial value to produce {@link Stream}s of `B` values.
   *
   * @param {A} a The initial value.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _chainRecDepthFirst(a: A): Stream<B> {
    return function* __chainRecDepthFirst() {
      for (const e of f(a)()) {
        if (isLeft(e)) {
          yield* _chainRecDepthFirst(e.left)()
        }
        else {
          yield e.right
        }
      }
    }
  }
}

/**
 * Recursively chain a {@link Stream} with a function that produces an
 * {@link Either} of `A` and `B` stream.
 * 
 * All the `A` items in the stream will be used to recursively produce more
 * streams to chain.
 *
 * @export
 * @template A The producing type.
 * @template B The output type.
 * @param {(a: A) => Stream<Either<A, B>>} f The stream producter function.
 * @return {(a: A) => Stream<B>} A function that takes an initial value to
 * start producing `B`s.
 * 
 * @__PURE__
 */
export function chainRecBreadthFirst<A, B>(f: (a: A) => Stream<Either<A, B>>) {
  /**
   * Takes an initial value to produce {@link Stream}s of `B` values.
   *
   * @param {A} a The initial value.
   * @return {Stream<B>} The output stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _chainRecBreadthFirst(a: A): Stream<B> {
    return function* __chainRecBreadthFirst() {
      const todo: Stream<Either<A, B>>[] = []

      function* go(fa: Stream<Either<A, B>>) {
        for (const e of fa()) {
          if (isLeft(e)) {
            todo.push(f(e.left))
          }
          else {
            yield e.right
          }
        }
      }

      yield* go(f(a))
      while (todo.length > 0) {
        const fa = todo.shift()!
        yield* go(fa)
      }
    }
  }
}

/**
 * The `Chain` category instance for {@link Stream}.
 */
export const Chain: Chain1<URI> = {
  URI,
  ap: Applicative.ap,
  map: Functor.map,
  chain(fa, f) { return chain(f)(fa) }
}

/**
 * The `ChainRec` category instance for {@link Stream} that uses `depth-first`
 * approach.
 */
export const ChainRecDepthFirst: ChainRec1<URI> = {
  URI,
  ap: Applicative.ap,
  chain: Chain.chain,
  map: Functor.map,
  chainRec(a, f) { return chainRecDepthFirst(f)(a) },
}

/**
 * The `ChainRec` category instance for {@link Stream} that uses `breadth-first`
 * approach.
 */
export const ChainRecBreadthFirst: ChainRec1<URI> = {
  URI,
  ap: Applicative.ap,
  chain: Chain.chain,
  map: Functor.map,
  chainRec(a, f) { return chainRecBreadthFirst(f)(a) },
}

/**
 * @category do notation
 */
export const Do = of({})

/**
 * @category do notation
 */
export const bind = chainBind(Chain)

/**
 * @category sequencing
 */
export const chainFirst = chainChainFirst(Chain)
