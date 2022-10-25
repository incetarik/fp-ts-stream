import {
  bind as chainBind,
  Chain1,
  chainFirst as chainChainFirst,
} from 'fp-ts/lib/Chain'
import { ChainRec1 } from 'fp-ts/lib/ChainRec'
import { Either, isLeft } from 'fp-ts/lib/Either'
import {
  chainFirstIOK as fromIOChainFirstIOK,
  chainIOK as fromIOChainIOK,
} from 'fp-ts/lib/FromIO'

import { Applicative } from './applicative'
import { Functor } from './functor'
import { of } from './pointed'
import { FromIO } from './transformations/from-io'
import { AsyncStream, URI } from './uri'

/**
 * Chains a {@link AsyncStream} by evaluating the function passed with the
 * items of it that returns another {@link AsyncStream} instance of type `B`.
 *
 * @export
 * @template A The value type.
 * @template B The new value/output type.
 * @param {(a: A) => AsyncStream<B>} f The function that produces an async 
 * stream of type `B` from given `A` value.
 * 
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream of type `A` and returns another async stream of type `B`. 
 * 
 * @__PURE__
 */
export function chain<A, B>(f: (a: A) => AsyncStream<B>) {
  /**
   * Takes a {@link AsyncStream} to pass its values to previously given function
   * that produces a {@link AsyncStream} of values of type `B`.
   *
   * @param {AsyncStream<A>} fa The source async stream.
   * @return {AsyncStream<B>} The chained output async stream.
   * @step 1
   * 
   * @__PURE__
   */
  return function _chain(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __chain() {
      for await (const a of fa()) {
        yield* f(a)()
      }
    }
  }
}

/**
 * Chains a {@link AsyncStream} by evaluating the function passed with the items
 * of it with an index that returns another {@link AsyncStream} instance of
 * type `B`.
 *
 * @export
 * @template A The value type.
 * @template B The new value/output type.
 * @param {(i: number, a: A) => AsyncStream<B>} f The function that produces an
 * async stream of type `B` from given `A` value.
 * 
 * @return {(fa: AsyncStream<A>) => AsyncStream<B>} A function that takes an
 * async stream of type `A` and returns another async stream of type `B`. 
 * 
 * @__PURE__
 */
export function chainWithIndex<A, B>(f: (i: number, a: A) => AsyncStream<B>) {
  /**
   * Takes a {@link AsyncStream} to pass its values to previously given function
   * that produces a {@link AsyncStream} of values of type `B`.
   *
   * @param {AsyncStream<A>} fa The source async stream.
   * @return {AsyncStream<B>} The chained output async stream.
   * @step 1
   * 
   * @__PURE__
   */
  return function _chainWithIndex(fa: AsyncStream<A>): AsyncStream<B> {
    return async function* __chainWithIndex() {
      let i = 0
      for await (const a of fa()) {
        yield* f(i++, a)()
      }
    }
  }
}

/**
 * Recursively chain a {@link AsyncStream} with a function that produces an
 * {@link Either} of `A` and `B` async stream.
 * 
 * All the `A` items in the async stream will be used to recursively produce
 * more async streams to chain.
 *
 * @export
 * @template A The producing type.
 * @template B The output type.
 * @param {(a: A) => AsyncStream<Either<A, B>>} f The stream producter function.
 * @return {(a: A) => AsyncStream<B>} A function that takes an initial value to
 * start producing `B`s.
 * 
 * @__PURE__
 */
export function chainRecDepthFirst<A, B>(f: (a: A) => AsyncStream<Either<A, B>>) {
  /**
   * Takes an initial value to produce {@link AsyncStream}s of `B` values.
   *
   * @param {A} a The initial value.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _chainRecDepthFirst(a: A): AsyncStream<B> {
    return async function* __chainRecDepthFirst() {
      for await (const e of f(a)()) {
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
 * Recursively chain a {@link AsyncStream} with a function that produces an
 * {@link Either} of `A` and `B` async stream.
 * 
 * All the `A` items in the async stream will be used to recursively produce
 * more async streams to chain.
 *
 * @export
 * @template A The producing type.
 * @template B The output type.
 * @param {(a: A) => AsyncStream<Either<A, B>>} f The async stream producter
 * function.
 * 
 * @return {(a: A) => AsyncStream<B>} A function that takes an initial value to
 * start producing `B`s.
 * 
 * @__PURE__
 */
export function chainRecBreadthFirst<A, B>(f: (a: A) => AsyncStream<Either<A, B>>) {
  /**
   * Takes an initial value to produce {@link AsyncStream}s of `B` values.
   *
   * @param {A} a The initial value.
   * @return {AsyncStream<B>} The output async stream.
   * 
   * @step 1
   * @__PURE__
   */
  return function _chainRecBreadthFirst(a: A): AsyncStream<B> {
    return async function* __chainRecBreadthFirst() {
      const todo: AsyncStream<Either<A, B>>[] = []

      async function* go(fa: AsyncStream<Either<A, B>>) {
        for await (const e of fa()) {
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
 * The `Chain` category instance for {@link AsyncStream}.
 */
export const Chain: Chain1<URI> = {
  URI,
  ap: Applicative.ap,
  map: Functor.map,
  chain(fa, f) { return chain(f)(fa) }
}

/**
 * The `ChainRec` category instance for {@link AsyncStream} that uses
 * `depth-first` approach.
 */
export const ChainRecDepthFirst: ChainRec1<URI> = {
  URI,
  ap: Applicative.ap,
  chain: Chain.chain,
  map: Functor.map,
  chainRec(a, f) { return chainRecDepthFirst(f)(a) },
}

/**
 * The `ChainRec` category instance for {@link AsyncStream} that uses
 * `breadth-first` approach.
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

/**
 * @category sequencing
 */
export const chainIOK = fromIOChainIOK(FromIO, Chain)

/**
 * @category sequencing
 */
export const chainFirstIOK = fromIOChainFirstIOK(FromIO, Chain)
