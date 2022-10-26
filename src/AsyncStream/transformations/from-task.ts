import { FromTask1 } from 'fp-ts/lib/FromTask'
import { Task } from 'fp-ts/lib/Task'

import { AsyncStream, URI } from '../uri'
import { FromIO } from './from-io'

/**
 * Creates an {@link AsyncStream} from a {@link Task} instance.
 *
 * @export
 * @template A The value type.
 * @param {Task<A>} fa The task instance.
 * @return {AsyncStream<A>} The async stream output.
 * 
 * @category conversions
 * @__PURE__
 */
export function fromTask<A>(fa: Task<A>): AsyncStream<A> {
  return async function* _fromTask() {
    yield await fa()
  }
}

/**
 * The `FromTask` category instance for {@link AsyncStream}.
 */
export const FromTask: FromTask1<URI> = {
  URI,
  fromIO: FromIO.fromIO,
  fromTask,
}
